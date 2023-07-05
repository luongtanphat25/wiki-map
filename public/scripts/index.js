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
});
