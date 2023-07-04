$(() => {
  const $main = $("#main-content");
  window.views_manager = {};
  window.views_manager.show = (item) => {
    $mapListings.detach();
    $logInForm.detach();
    $signUpForm.detach();

    switch (item) {
    case "listings":
      $mapListings.appendTo($main);
      break;
    case "logIn":
      $logInForm.appendTo($main);
      break;
    case "signUp":
      $signUpForm.appendTo($main);
      break;
    }
  };
});
