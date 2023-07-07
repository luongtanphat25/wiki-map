$(() => {
  const updateHeader = (user) => {
    let lefContnet = `
      <li class="nav-item">
          <a class="nav-link" id="favorite_map" href="/my-map">My Map</a>
        </li>
      <li class="nav-item">
        <a class="nav-link" id="favorite_map" href="#">Favorite Map</a>
      </li>
    `;
    let htmlContent;
    if (user) {
      $("#left-corner-navbar").append(lefContnet);
      htmlContent = `
      <div>
        <a class="text-white me-3">Hello, ${user.name}</a>
        <button class="btn btn-light" id="log-out_button">Log out</button>
      </div>
      `;
    } else {
      $("#left-corner-navbar").remove();
      htmlContent = `
      <div>
        <a class="btn btn-secondary me-3" id="signup_button" href="/signup">
          Sign up
        </a>
        <a class="btn btn-light" id="login_button" href="/login">Log in</a>
      </div>
      `;
    }

    $("right-corner-navbar").remove();
    $("#right-corner-navbar").append(htmlContent);
  };

  window.header = {};
  window.header.update = updateHeader;

  $.ajax({ url: "/api/users/me" }).then((json) => {
    updateHeader(json.user ? json.user : null);
  });

  $("#right-corner-navbar").on("click", "#log-out_button", () => {
    console.log("click");
    $.ajax({ method: "POST", url: "/api/users/logout" }).then(() => {
      window.location.href = "/";
    });
  });
});
