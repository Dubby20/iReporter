/* eslint-disable no-plusplus */
const editedFlagComment = document.getElementById('edit-red-flag');
const locationText = document.getElementById('location-code');
// const loader = document.querySelector('.loader');


const modalPage = document.getElementById('modalPage');
const closeBtn = document.querySelector('.close-btn');


const modalBtn = document.querySelectorAll('.modalBtn');
for (let i = 0; i < modalBtn.length; i++) {
  modalBtn[i].addEventListener('click', () => {
    modalPage.style.display = 'block';
  });
}
// closeBtn.onclick = () => {
//   modalPage.style.display = 'none';
// };

window.onclick = (event) => {
  if (event.target === modalPage) {
    modalPage.style.display = 'none';
  }
};

const showPosition = (position) => {
  locationText.innerHTML = `Location: <span id="location" style="color:#361f55">${position.coords.latitude}, ${position.coords.longitude}</span>`;
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationText.innerHTML = 'Geolocation is not supported by this browser.';
  }
};


const initMap = (position) => {
  const myLocation = {
    lat: `${position.coords.latitude}`,
    lng: `${position.coords.longitude}`
  };
  // eslint-disable-next-line no-undef
  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 4,
      center: myLocation
    }
  );
  // eslint-disable-next-line no-undef
  const marker = new google.maps.Marker({
    position: myLocation,
    map
  });

  marker.setMap(map);
};


const closeModalForm = (elemID) => {
  const modal = document.getElementById(elemID);
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};

const showButton = () => {
  const btn = document.getElementById('item');
  if (btn.style.display === 'none') {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
};

const hideBtn = document.querySelectorAll('.hideBtn');
const showBtn = document.querySelectorAll('.showBtn');

const hideDisplayBtn = () => {
  if (localStorage.getItem('userToken') !== null) {
    for (let i = 0; i < hideBtn.length; i++) {
      hideBtn[i].style.display = 'none';
    }
  } else {
    for (let i = 0; i < showBtn.length; i++) {
      showBtn[i].style.display = 'none';
    }
  }
};

hideDisplayBtn();


const checkToken = () => {
  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = './login.html';
  }
};

const checkUser = () => {
  const actionBtn = document.querySelector('.action-btn');
  const user = JSON.parse(localStorage.getItem('userToken'));
  for (let i = 0; i < actionBtn.length; i++) {
    if (user.id !== report.user_id) {
      actionBtn[i].style.display = 'none';
    } else {
      actionBtn[i].style.display = 'block';
    }
  }
  console.log(actionBtn);
};

const editComment = () => {
  const hideDiv = document.querySelector('.hide-div');
  const currentComment = document.getElementById('comment').innerHTML;
  // const commentBtn = document.querySelector('.comment-btn');
  const commentText = document.getElementById('comment-area');
  hideDiv.style.display = 'block';
  commentText.value = currentComment;
  document.getElementById('comment').style.display = 'none';
};

const cancelComment = () => {
  const hideDiv = document.querySelector('.hide-div');
  const commentText = document.getElementById('comment-area');
  commentText.value = '';
  hideDiv.style.display = 'none';
  document.getElementById('comment').style.display = 'block';
};

const saveComment = () => {
  const commentError = document.getElementById('comment-error');
  let recordUrl;

  const user = JSON.parse(localStorage.getItem('userToken'));
  checkToken();
  const reportId = localStorage.getItem('Id');
  const reportType = localStorage.getItem('reportType');
  if (reportType === 'red-flag') {
    recordUrl = `https://ireporter247.herokuapp.com/api/v1/red-flags/${reportId}/comment`;
  } else if (reportType === 'intervention') {
    recordUrl = `https://ireporter247.herokuapp.com/api/v1/interventions/${reportId}/comment`;
  }
  const newComment = document.getElementById('comment-area').value;
  const updatedComment = document.getElementById('comment');
  const hideDiv = document.querySelector('.hide-div');
  if (!(newComment && newComment.trim().length)) {
    return commentError.innerHTML = '<p style="color:red";>Please enter a comment</p>';
  }

  updatedComment.innerHTML = newComment;
  document.getElementById('comment').style.display = 'block';

  const info = {
    comment: newComment
  };

  fetch(recordUrl, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token
      },
      mode: 'cors',
      body: JSON.stringify(info)
    }).then(response => response.json())
    .then((data) => {
      if (data.status === 200) {
        console.log(data);
        hideDiv.style.display = 'none';
      } else {
        hideDiv.style.display = 'none';
        commentError.style.display = 'block';
        commentError.style.color = 'red';
        commentError.innerHTML = 'Access denied';
      }
    });
};

// const parseJwt = (token) => {
//   try {
//     const base64HeaderUrl = token.split('.')[0];
//     const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
//     const headerData = JSON.parse(window.atob(base64Header));

//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace('-', '+').replace('_', '/');
//     const dataJWT = JSON.parse(window.atob(base64));
//     dataJWT.header = headerData;
//     return dataJWT;
//   } catch (err) {
//     return false;
//   }
// };
// parseJwt(token);


// export default parseJwt;