const signUpLoader = document.querySelector('.signUpLoader');
const registerForm = document.getElementById('registerForm');
const msgDiv = document.querySelector('.msg-div');

const validateSignup = (firstname, lastname, othernames, username, email, phoneNumber, password) => {
  if (firstname == '') {
    alert('Firstname must be filled out');
    document.getElementById('msg-error').innerHTML = 'You must have to provide firstname';
    document.getElementById('fistname').style.border = 'solid 1px red';
    return false;
  }
  // else {
  //   document.getElementById('msg-error').innerHTML = "";
  //   document.getElementById('firstname').style.border = "solid 1px #a9a9a9";
  // }

  if (lastname == '') {
    alert('Lastname must be filled out');
    document.getElementById('msg-error').innerHTML = 'You must have to provide email';
    document.getElementById('lastname').style.border = 'solid 1px red';
    return false;
  }
  // else {
  //   document.getElementById('lastname').innerHTML = "";
  //   document.getElementById('lastname').style.border = "solid 1px #a9a9a9";
  // }
  if (othernames == '') {
    alert('Email must be filled out');
    document.getElementById('othernames').innerHTML = 'You must have to provide othernames';
    document.getElementById('othernames').style.border = 'solid 1px red';
    return false;
  }
  // else {
  //   document.getElementById('msg-error').innerHTML = "";
  //   document.getElementById('othernames').style.border = "solid 1px #a9a9a9";
  // }
  if (username == '') {
    alert('Email must be filled out');
    document.getElementById('msg-error').innerHTML = 'You must have to provide username';
    document.getElementById('username').style.border = 'solid 1px red';
    return false;
  }
  // else {
  //   document.getElementById('msg-error').innerHTML = "";
  //   document.getElementById('username').style.border = "solid 1px #a9a9a9";
  // }
  if (email == '') {
    alert('Email must be filled out');
    document.getElementById('msg-error').innerHTML = 'You must have to provide email';
    document.getElementById('email').style.border = 'solid 1px red';
    return false;
  }
  // else {
  //   document.getElementById('msg-error').innerHTML = "";
  //   document.getElementById('email').style.border = "solid 1px #a9a9a9";
  // }
  if (phoneNumber == '') {
    alert('phoneNumber must be filled out');
    document.getElementById('msg-error').innerHTML = 'You must have to provide phone number';
    document.getElementById('phoneNumber').style.border = 'solid 1px red';
    return false;
  }
  //  else {
  //   document.getElementById('msg-error').innerHTML = "";
  //   document.getElementById('phoneNumber').style.border = "solid 1px #a9a9a9";
  // }
  if (password == '') {
    alert('password must be filled out');
    document.getElementById('msg-error').innerHTML = 'You must have to provide password';
    document.getElementById('password').style.border = 'solid 1px red';
    return false;
  }
  // else {
  //   document.getElementById('msg-error').innerHTML = "";
  //   document.getElementById('password').style.border = "solid 1px #a9a9a9";
  // }
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
  const validity = validateSignup(firstname, lastname, othernames, username, email, phoneNumber, password);
  const confirmPassword = document.getElementById('confirmPassword').value;
  const result = validatePassword(info.password, confirmPassword);
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
          signUpLoader.style.display = 'none';
          window.location = './index.html';
        } else {
          msgDiv.style.display = 'block';
          msgDiv.style.color = 'red';
          signUpLoader.style.display = 'none';
          msgDiv.innerHTML = data.message;
          window.location.href = './register.html';
        }
      }).catch((error) => {
        throw error;
      });
  } else {
    msgDiv.textContent = 'Password does not match';
    msgDiv.style.color = 'red';
    signUpLoader.style.display = 'none';
  }
};

registerForm.addEventListener('submit', newUser);