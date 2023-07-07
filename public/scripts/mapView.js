/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-var */
$(() => {
  // MAP's set up
  $("#heart").hide();
  let map = L.map("map").setView([43.6532, -79.3832], 12);
  let layerGroup = L.layerGroup().addTo(map);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //map_id
  const map_id = window.location.pathname.split("/").slice(-1)[0];

  //add point form
  const addPointForm = `
    <form id="addPointForm" class="rounded bg-light text-white m-auto p-3" style="width: 25rem;">
      <h5>Add new point</h5>
        <input type="hidden" name="map_id" value=${map_id} />
        <input type="text" class="form-control mb-3" placeholder="Point's title" name="title" required>
        <textarea class="form-control mb-3" name="description" placeholder="Description" required></textarea>
        <input type="text" class="form-control mb-3" placeholder="Image's url" name="image" required>
        <input type="hidden" id="longPoint" name="long"/>
        <input type="hidden" id="latPoint" name="lat"/>
        <div class="d-grid">
          <button id="addPointFormSubmit" class="btn btn-outline-info mb-3">Add point</button>
          <button id="cancelButton" type="button" class="btn btn-outline-danger">Cancel</button>
        </div>
    </form>
  `;
  //Add Point for authenticaed user only
  $.ajax({ url: "/api/users/me" }).then((json) => {
    let isAuthenticaed = false;
    if (json.user) {
      const currentUser = json.user;

      $("#heart").show();
      $.ajax({ url: `/api/fav/favMap/${currentUser.id}/${map_id}` }).then(
        (json) => {
          // console.log(json);
          if (json.favMap.length > 0) {
            $("#heart").css("color", "red");
          } else {
            $("#heart").css("color", "grey");
          }
        }
      );

      $("#heart").on("click", function (event) {
        event.preventDefault();

        $.ajax({
          url: `/api/fav/favMap/${currentUser.id}/${map_id}`,
        })
          .then((json) => {
            if (json.favMap.length > 0) {
              //delete fav
              $.ajax({
                method: "DELETE",
                url: `/api/fav/`,
                data: { user_id: currentUser.id, map_id: parseInt(map_id) },
              })
                .then((json) => {
                  console.log("json");
                  $("#heart").css("color", "grey");
                })
                .catch((e) => {
                  console.log(e);
                });
            } else {
              //add fav
              $.ajax({
                method: "POST",
                url: `/api/fav/`,
                data: { user_id: currentUser.id, map_id: parseInt(map_id) },
              })
                .then((json) => {
                  console.log("json");
                  $("#heart").css("color", "red");
                  // location.reload();
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });

      $.ajax({ url: `/api/maps/map/${map_id}` }).then((json) => {
        isAuthenticaed = currentUser.id === json.data.user_id;

        if (isAuthenticaed) {
          $("#addPoint").append(addPointForm);
          $("#addPointForm").hide();

          //click on map to show add point form
          map.on("click", (e) => {
            layerGroup.clearLayers();
            $("#editPointForm").hide();
            $("#addPointForm").show();

            L.marker(e.latlng).addTo(layerGroup);
            $("#latPoint").val(Math.round(e.latlng.lng * 10000) / 10000);
            $("#longPoint").val(Math.round(e.latlng.lat * 10000) / 10000);
          });

          //add point clicked
          $("#addPointForm").on("submit", function (event) {
            event.preventDefault();
            const data = $(this).serialize();
            $.ajax({ method: "POST", url: "/api/points/", data }).then(
              (json) => {
                console.log(json);
                location.reload();
              }
            );
          });

          $("#cancelButton").on("click", () => {
            $("#addPointForm").hide();
            layerGroup.clearLayers();
          });
        }
      });
    }

    $.ajax({ url: `/api${window.location.pathname}` }).then((json) => {
      const points = json.points;
      let htmlContent = ``;
      //set map display
      if (points[0]) {
        map.setView([points[0].long, points[0].lat], 12);
      }
      //display marker for each point
      for (const p of points) {
        const marker = L.marker([p.long, p.lat]).addTo(map);
        marker.bindPopup(`<b>${p.title}</b>`);

        //display edit delete button for authenticated user;
        if (isAuthenticaed) {
          htmlContent += `
          <div class="card text-bg-light m-3" style="width: 25rem;">
            <img src=${p.image} class="card-img-top"/>
            <h5 class="card-header">${p.title}</h5>
            <p class="card-text p-3">${p.description}</p>
            <div id="delete-edit-form" class="card-footer text-end">
              <a id="editPointButton" class="btn btn-outline-primary me-2" href="/edit/point/${p.id}">Edit</a>

              <button id="deletePointButton" class="btn btn-outline-danger" value=${p.id}>Delete</button>
            </div>
          </div>`;
        } else {
          htmlContent += `
          <div class="card text-bg-light m-3" style="width: 25rem;">
            <img src=${p.image} class="card-img-top"/>
            <h5 class="card-header">${p.title}</h5>
            <p class="card-text p-3">${p.description}</p>
          </div>`;
        }
      }

      //add point to page
      $("#points").append(htmlContent);

      $("#delete-edit-form").on(
        "click",
        "#deletePointButton",
        function (event) {
          event.preventDefault();
          const data = $(this).val();
          $.ajax({ method: "DELETE", url: `/api/points/${data}` }).then(() => {
            location.reload();
          });
        }
      );
    });
  });
});
