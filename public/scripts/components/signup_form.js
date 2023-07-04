$(() => {
  const $signUpForm = $(`
  <div class="position-absolute top-50 start-50 translate-middle" id="sign-in">
      <div class="container p-3 border border-primary rounded bg-dark text-white">
        <h3>Create an account</h3>
        <p class="text-secondary">
          Create an account to create map to save your favorite places
        </p>

        <form id="sign-up-form">
          <div class="mb-3">
            <label for="name" class="form-label">User name</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Plase enter your username" required/>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="username@gmail.com" required/>
          </div>

          <div class="mb-5">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" name="password" required/>
          </div>

          <div class=" d-grid">
            <button type="submit" class="btn btn-info">Sign-in</button>
          </div>

        </form>
      </div>
    </div>
  `);

  window.$signUpForm = $signUpForm;

  $signUpForm.on("submit", (event) => {
    event.preventDefault();

    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/api/users/",
      data,
    }).then((json) => {
      header.update(json.user);
      views_manager.show("listings");
    });
  });
});
