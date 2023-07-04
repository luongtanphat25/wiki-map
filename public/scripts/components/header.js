$(() => {
  window.header = {};
  const $pageHeader = $("#page-header");
  let currentUser = null;

  const updateHeader = (user) => {
    currentUser = user;
    $pageHeader.find("#page-header__user-links").remove();
    let userLinks;

    if (!user) {
      userLinks = `
      <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" id="page-header__user-links">
        <div class="container-fluid">
          <a class="navbar-brand" id="home">
            <i class="fa-solid fa-map-location fa-2xl p-3"></i>
            Wiki-Map
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse space-between" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" id="favorite_map">Favorite Map</a>
              </li>
            </ul>

            <div>
              <button class="btn btn-link text-info me-3" id="signup_button">Create an account</button>
              <button class="btn btn-light" id="login_button">Log in</button>
            </div>
          </div>
        </div>
      </nav>
      `;
    } else {
      userLinks = `
      <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" id="page-header__user-links">
        <div class="container-fluid">
          <a class="navbar-brand" id="home">
            <i class="fa-solid fa-map-location fa-2xl p-3"></i>
            Wiki-Map
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse space-between" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" id="favorite_map">Favorite Map</a>
              </li>
            </ul>

            <div>
              <a class="text-white p-3">Hello, ${user.name}</a>
              <button class="btn btn-light" id="logout_button">Log out</button>
            </div>
          </div>
        </div>
      </nav>
      `;
    }

    $pageHeader.append(userLinks);
  };

  window.header.update = updateHeader;

  $.ajax({ url: "api/users/me" }).then((json) => {
    updateHeader(json.user);
  });

  $.ajax({
    url: "/api/users/me",
  }).then((json) => {
    console.log("update header called");
    updateHeader(json.user);
  });

  $("header").on("click", "#home", () => {
    views_manager.show("listing");
  });

  $("header").on("click", "#login_button", () => {
    views_manager.show("logIn");
  });
  $("header").on("click", "#signup_button", () => {
    views_manager.show("signUp");
  });
  $("header").on("click", "#logout_button", () => {
    $.ajax({
      method: "POST",
      url: "/api/users/logout",
    }).then(() => {
      window.header.update(null);
    });
  });
});
