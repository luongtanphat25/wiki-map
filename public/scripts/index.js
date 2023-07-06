$(() => {
  $.ajax({
    url: "/api/maps/",
  })
    .then((json) => {
      let list = `
        <table class="table table-striped">
          <thead><tr><th scope="col">List of Maps</th></tr></thead>
          <tbody>
      `;
      for (const m of json.maps) {
        list += `<tr><td>

        <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="/points/${m.id}">
          ${m.name}
        </a>
        </td></tr>`;
      }
      list += `</tbody></table>`;
      $("#list_of_maps").append(list);
    })
    .catch((e) => console.log("e", e));

  $.ajax({ url: "/api/users/me" }).then((json) => {
    if (json.user) {
      $("#list_of_maps").prepend(`<form id="create-map-form" class="m-3 row">
        <input type="text" class="form-control col me-3" id="mapName" name ="mapName" placeholder="Map's name" required>
        <button class="btn btn-info text-white me-2" id="add-map-button" style="width: 8em;">
          <i class="fa-solid fa-plus"></i> Add map
        </button>
      </form>`);
    }

    $("#create-map-form").on("submit", function (event) {
      event.preventDefault();
      const data = $(this).serialize();
      $.ajax({ method: "POST", url: "/api/maps/", data }).then(() => {
        location.reload();
      });
    });
  });
});
