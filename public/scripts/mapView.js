/* eslint-disable no-undef */
/* eslint-disable no-var */
$(() => {
  // var map = L.map("map").setView([43.65, -79.45], 10);
  // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   maxZoom: 19,
  //   attribution:
  //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  // }).addTo(map);

  $.ajax({ url: "/api/points" }).then((json) => {
    console.log(json.points);
  });
});
