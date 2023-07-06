/* eslint-disable no-undef */
/* eslint-disable no-var */
$(() => {
  const url = `/api${window.location.pathname}`;
  let htmlContent = ``;
  $.ajax({ url: url }).then((json) => {
    const points = json.points;

    let map = L.map("map").setView([points[0].long, points[0].lat], 12);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    for (const p of points) {
      const marker = L.marker([p.long, p.lat]).addTo(map);
      marker.bindPopup(`<b>${p.title}</b>`);

      htmlContent += `
      <div class="card text-bg-light m-3" style="width: 25rem;">
        <img src=${p.image} class="card-img-top"/>
        <h5 class="card-header">${p.title}</h5>
        <p class="card-text p-3">${p.description}</p>
      </div>`;
    }

    $("#points").append(htmlContent);
  });
});
