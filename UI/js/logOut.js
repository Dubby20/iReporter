const logOutBtn = document.querySelectorAll('.logOut');

// eslint-disable-next-line no-plusplus
for (let i = 0; i < logOutBtn.length; i++) {
  logOutBtn[i].addEventListener('click', () => {
    localStorage.removeItem('userToken');
    window.location.href = '/';
  });
}