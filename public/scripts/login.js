$(() => {
  $.ajax({ url: "/api/users/me" }).then((json) => {
    if (!json.user) {
      $("#errorMessage").hide();
      $("#login_form").on("submit", function (event) {
        event.preventDefault();
        const data = $(this).serialize();
        $.ajax({
          method: "POST",
          url: "/api/users/login",
          data,
        }).then((json) => {
          if (json.error) {
            $("#errorMessage").empty().append(`${json.error}`).show();
            return;
          }
          window.location.href = "/my-map";
        });
      });
    } else {
      window.location.href = "/";
    }
  });
});
