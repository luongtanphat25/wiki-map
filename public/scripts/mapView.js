/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-var */
$(() => {
  // MAP's set up
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
    <form id="addPointForm" class="m-auto border border-dark p-3 rounded" style="width: 25rem;">
      <h5>Add new point</h5>
        <input type="hidden" name="map_id" value=${map_id} />
        <input type="text" class="form-control mb-3" placeholder="Point's title" name="title" required>
        <textarea class="form-control mb-3" name="description" placeholder="Description" required></textarea>
        <input type="text" class="form-control mb-3" placeholder="Image's url" name="image" required>
        <input type="hidden" id="longPoint" name="long"/>
        <input type="hidden" id="latPoint" name="lat"/>
        <div class="d-grid">
          <button id="addPointFormSubmit" class="btn btn-outline-dark">Add point</button>
        </div>
    </form>
  `;

  const url = `/api${window.location.pathname}`;
  let htmlContent = ``;
  let isAuthenticaed = false;

  let currentUser;
  //Add Point for authenticaed user only
  $.ajax({ url: "/api/users/me" }).then((json) => {
    if (json.user) {
      currentUser = json.user;
      $.ajax({ url: `/api/maps/map/${map_id}` }).then((json) => {
        isAuthenticaed = currentUser.id === json.data.user_id;
        console.log("inside: ",isAuthenticaed);
        if (isAuthenticaed) {
          $("#addPoint").append(addPointForm);
          $("#addPointForm").hide();

          //click on map to show add point form
          map.on("click", (e) => {
            layerGroup.clearLayers();
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
        }
      });
    }

    $.ajax({ url: url }).then((json) => {
      const points = json.points;

      //set map display
      if (points[0]) {
        map.setView([points[0].long, points[0].lat], 12);
      }
      //display marker for each point
      for (const p of points) {
        const marker = L.marker([p.long, p.lat]).addTo(map);
        marker.bindPopup(`<b>${p.title}</b>`);

        //display edit delete button for authenticated user;
        console.log("outside: ",isAuthenticaed);
        if (isAuthenticaed) {
          htmlContent += `
          <div class="card text-bg-light m-3" style="width: 25rem;">
            <img src=${p.image} class="card-img-top"/>
            <h5 class="card-header">${p.title}</h5>
            <p class="card-text p-3">${p.description}</p>
            <div id="delete-edit-form" class="card-footer text-end">
              <button id="" class="btn btn-outline-primary me-2">Edit</button>
              <button id="deletePointButton" class="btn btn-outline-danger" value=${p.id}>Delete</a>
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

      $("#delete-edit-form").on("click", "#deletePointButton", function (event) {
        event.preventDefault();
        const data = $(this).val();
        $.ajax({ method: "DELETE", url: `/api/points/${data}` }).then(() => {
          location.reload();
        });
      });
    });
  });

  //Get all points of this map

});
