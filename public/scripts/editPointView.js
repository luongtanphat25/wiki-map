/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
$(() => {
  $.ajax({ url: "/api/users/me" }).then((json) => {
    const { user } = json;
    console.log(user);

    const pointID = window.location.pathname.split("/").slice(-1)[0];
    $.ajax({ url: `/api/points/point/${pointID}` }).then((json) => {
      const { point } = json;
      console.log(point);

      $.ajax({ url: `/api/maps/map/${point.map_id}` }).then((json) => {
        const isAuthenticaed = json.data.user_id === user.id;
        if (isAuthenticaed) {
          const editPointForm = `
            <form id="editPointForm" class="m-auto p-3 rounded bg-dark text-white" style="width: 25rem;">
              <input type="hidden" name="map_id" value=${point.map_id} focus/>

              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control mb-3" placeholder="Point's title" name="title" id="title" value=${point.title} required>

              <label for="description" class="form-label">Description</label>
              <textarea class="form-control mb-3" value=${point.description} name="description" placeholder="Description" id="description" required></textarea>

              <label for="image" class="form-label">Image's url</label>
              <input type="text" class="form-control mb-3" placeholder="Image's url" name="image" value=${point.image} required id="image" />

              <input type="hidden" value=${point.long} id="longPoint" name="long"/>
              <input type="hidden" value=${point.lat} id="latPoint" name="lat"/>
              <div class="d-grid">
                <button type="submit" id="save" class="btn btn-info">Save</button>
              </div>
            </form>
          `;

          let map = L.map("map").setView([43.6532, -79.3832], 12);
          let layerGroup = L.layerGroup().addTo(map);
          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(map);
          L.marker([point.long, point.lat]).addTo(layerGroup);

          $("#addPoint").append(editPointForm);

          map.on("click", (e) => {
            layerGroup.clearLayers();
            L.marker(e.latlng).addTo(layerGroup);
            $("#latPoint").val(Math.round(e.latlng.lng * 10000) / 10000);
            $("#longPoint").val(Math.round(e.latlng.lat * 10000) / 10000);
          });

          $("#editPointForm").on("submit", function (event) {
            event.preventDefault();
            const data = $(this).serialize();
            //Call ajax update point
            $.ajax({ method: "POST", url: `/api/points/${point.id}`, data }).then((json) => {
              console.log(json);
            });
          });
        } else {
          window.location.href("/login");
        }
      });
    });
  });
});
