const loader = document.querySelector('.loader');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const msgDiv = document.getElementById('msg-error');
const displayError = (message) => {
  const para = document.createElement('p');
  para.textContent = message;
  para.style.color = 'red';
  msgDiv.appendChild(para);
};

const validNameRegex = /^[A-Za-z]{3,30}$/;
const othernamesRegex = /^[a-zA-Z]'?([a-zA-Z]|\.| |-){3,}$/;
const usernameRegex = /^[A-Za-z0-9]{3,20}$/;
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /^[A-Za-z0-9]{6,}$/;
const phoneNumberRegex = /^(\+?234|0)?[789]\d{9}$/;
const validateSignup = ({
  firstname,
  lastname,
  othernames,
  username,
  email,
  phoneNumber,
  password
}) => {
  let isValidated = true;
  if (!validNameRegex.test(firstname)) {
    displayError('Invalid firstname');
    isValidated = false;
  }

  if (!validNameRegex.test(lastname)) {
    displayError('Invalid lastname');
    isValidated = false;
  }

  if (!othernamesRegex.test(othernames)) {
    displayError('Invalid othernames');
    isValidated = false;
  }

  if (!usernameRegex.test(username)) {
    displayError('Invalid username');
    isValidated = false;
  }

  if (!emailRegex.test(email)) {
    displayError('Invalid email');
    isValidated = false;
  }

  if (!phoneNumberRegex.test(phoneNumber)) {
    displayError('Invalid phone number');
    isValidated = false;
  }

  if (!passwordRegex.test(password)) {
    displayError('Invalid password');
    isValidated = false;
  }
  return isValidated;
};


const validatePassword = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  }
  return false;
};
const signUpUrl = 'https://ireporter247.herokuapp.com/api/v1/auth/signup';
const newUser = (e) => {
  e.preventDefault();
  msgDiv.innerHTML = '';
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
  const isValid = validateSignup(info);
  if (!isValid) {
    return;
  }
  const confirmPassword = document.getElementById('confirmPassword').value;
  const result = validatePassword(info.password, confirmPassword);
  loader.style.display = 'block';
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
        if (data.status === 201 && data.data[0].token) {
          localStorage.setItem('userToken', data.data[0].token);
          loader.style.display = 'none';
          window.location = '/';
        } else {
          msgDiv.style.display = 'block';
          msgDiv.style.color = 'red';
          loader.style.display = 'none';
          msgDiv.innerHTML = data.message;
          window.location.href = '/register';
        }
      }).catch((error) => {
        throw error;
      });
  } else {
    msgDiv.textContent = 'Password does not match';
    msgDiv.style.color = 'red';
    loader.style.display = 'none';
  }
};


registerForm.addEventListener('submit', newUser);