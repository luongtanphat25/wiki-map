$(() => {
  $("#login_button").on("submit", (event) => {
    event.preventDefault();
    $("#result").append(`<h1>Login clicked</h1>`);
  });
});
