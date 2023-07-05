$(() => {
  $("#login_form").on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data,
    }).then(() => {
      window.location.href = "/";
    });
  });
});
