$(() => {
  let currentUser;
  $.ajax({ url: "/api/users/me" }).then((json) => {
    if (json.user) {
      currentUser = json.user;
      $("#list_of_maps").prepend(`<form id="create-map-form" class="p-3 row">
        <input type="text" class="form-control col me-3" id="mapName" name ="mapName" placeholder="Map's name" required>
        <button class="btn btn-info text-white me-2" style="width: 8em;">
          <i class="fa-solid fa-plus"></i> Add map
        </button>
      </form>`);

      $.ajax({
        url: `/api/maps/user/${json.user.id}`,
      })
        .then((json) => {
          let list = `
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Your map</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
          `;
          for (const m of json.maps) {
            list += `
            <tr>
              <td>
                <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="/points/${m.id}">${m.name}</a>
              </td>
              <td>
                <button class="btn btn-outline-danger text-right" value=${m.id} id="deleteMapButton">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </td>
            </tr>`;
          }
          list += `</tbody></table>`;
          $("#list_of_maps").append(list);
        })
        .catch((e) => console.log("e", e));
    } else {
      window.location.href = "/login";
    }

    $("#create-map-form").on("submit", function (event) {
      event.preventDefault();
      const data = $(this).serialize();
      $.ajax({ method: "POST", url: "/api/maps/", data }).then(() => {
        location.reload();
      });
    });

    $("#list_of_maps").on("click", "#deleteMapButton", function (event) {
      event.preventDefault();
      const data = $(this).val();
      $.ajax({ method: "DELETE", url: `/api/maps/${data}` }).then((result) => {
        if (!result.error) {
          location.reload();
        }
      });
    });
  });
});
