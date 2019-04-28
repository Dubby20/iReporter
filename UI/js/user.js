/* eslint-disable func-names */

(function () {
  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = './login.html';
  }
}());

(function () {
  let user = localStorage.getItem('userToken');
  user = JSON.parse(user);
  if (user.user.isAdmin) {
    window.location.href = '/';
  }
}());