$(() => {
  $.ajax({ url: "/api/users/me" }).then((json) => {
    if (json.user) {
      $.ajax({
        url: `/api/fav/${json.user.id}`,
      })
        .then((json) => {
          let list = `
            <table class="table table-striped">
              <thead><tr><th scope="col"><h3>List of Maps</h3></th></tr></thead>
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
    }
  });
});
