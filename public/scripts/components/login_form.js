$(() => {
  const $logInForm = $(`
  <form class="position-absolute top-50 start-50 translate-middle">
      <div class="container p-3 border border-primary rounded bg-dark text-white">
        <h3>Log in</h3>
        <p class="text-secondary">
          Welcome back, please log-in to see your favoire destinations
        </p>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="username@gmail.com" required/>
          </div>

          <div class="mb-5">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password" required/>
          </div>

          <div class=" d-grid">
            <button class="btn btn-info">Log-in</button>
          </div>

      </div>
    </form>
  `);

  window.$logInForm = $logInForm;

  $logInForm.on("submit", function(event) {
    event.preventDefault;

    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/api/users/login",
      data,
    }).then((json) => {
      window.header.update(json.user);
      window.views_manager.show("listings");
    });
  });
});
