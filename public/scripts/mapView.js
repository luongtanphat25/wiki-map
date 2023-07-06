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
      <div class="card text-bg-dark m-3 col">
        <div class="card-header"><h4>${p.title}</h4></div>
        <img class="img" src=${p.image} />
        <div class="card-body">
          <p class="card-text">${p.description}</p>
        </div>
      </div>`;
    }

    $("#points").append(htmlContent);
  });
});
