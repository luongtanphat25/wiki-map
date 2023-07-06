$(() => {
  $("#sign-up-form").on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/api/users/",
      data,
    }).then((json) => {
      console.log("after sign-up: ", json);
      window.location.href = "/";
    });
  });
});
