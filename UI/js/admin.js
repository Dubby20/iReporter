// eslint-disable-next-line func-names
(function () {
  let user = localStorage.getItem('userToken');
  user = JSON.parse(user);
  if (!user.user.isAdmin) {
    window.location.href = '/';
  }
}());