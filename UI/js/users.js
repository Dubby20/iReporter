const signUpLoader = document.querySelector('.signUpLoader');
const registerForm = document.getElementById('registerForm');


const validatePassword = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  }
  return false;
};
const signUpUrl = 'http://localhost:8080/api/v1/auth/signup';
const newUser = (e) => {
  e.preventDefault();
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const othernames = document.getElementById('othernames').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const password = document.getElementById('password').value;
  const info = {
    firstname,
    lastname,
    othernames,
    username,
    email,
    phoneNumber,
    password
  };
  const confirmPassword = document.getElementById('confirmPassword').value;
  const result = validatePassword(info.password, confirmPassword);
  const msgDiv = document.querySelector('.msg-div');
  signUpLoader.style.display = 'block';
  if (result) {
    fetch(signUpUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(info)
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 201 && data.data[0].token) {
          localStorage.setItem('userToken', data.data[0].token);
          window.location = './index.html';
          return;
        }
        if
      }).catch((error) => {
        throw error;
      });
  }
};