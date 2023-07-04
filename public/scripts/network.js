const logOut = () => {
  return $.ajax({
    method: "POST",
    url: "/api/users/logout",
  });
};

const getMyDetail = () => {
  return $.ajax({
    url: "/api/users/me",
  });
};
