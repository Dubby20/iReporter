const loginForm = document.getElementById('loginForm');
const loader = document.querySelector('.loader');
const msgDiv = document.getElementById('msg-error');


const loginUrl = 'https://ireporter247.herokuapp.com/api/v1/auth/login';
const loginUser = (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const info = {
    email,
    password
  };
  loader.style.display = 'block';
  fetch(loginUrl, {
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
      if (data.status === 422) {
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'red';
        loader.style.display = 'none';
        msgDiv.innerHTML = data.error;
      } else if (data.status === 200) {
        localStorage.setItem('userToken', JSON.stringify(data.data[0]));
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'green';
        loader.style.display = 'none';
        msgDiv.innerHTML = data.message;
        window.location.href = data.data[0].user.isAdmin ? '/admin/admin' : '/';
      } else {
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'red';
        loader.style.display = 'none';
        msgDiv.innerHTML = data.error;
        window.location.href = '/login';
      }
    }).catch((error) => {
      throw error;
    });
};

loginForm.addEventListener('submit', loginUser);