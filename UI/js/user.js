// eslint-disable-next-line func-names
(function () {
  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = '/';
  }
}());