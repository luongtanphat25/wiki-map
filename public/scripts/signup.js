$(() => {
  $("#errorMessage").hide();
  $("#sign-up-form").on("submit", function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/api/users/",
      data,
    }).then((json) => {
      if (json.error) {
        $("#errorMessage").empty().append(`${json.error}`).show();
        return;
      }
      window.location.href = "/";
    });
  });
});
