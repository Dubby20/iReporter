/* eslint-disable no-plusplus */
const editRedFlag = document.getElementById('edit-red-flag');
const locationText = document.getElementById('location-code');


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