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

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationText.innerHTML = 'Geolocation is not supported by this browser.';
  }
};


function showPosition(position) {
  locationText.innerHTML = `Latitude: ${position.coords.latitude
    }<br>Longitude: ${position.coords.longitude}`;
}


function initMap() {
  const myLocation = {
    lat: 6.5243793,
    lng: 3.3792057
  };
  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 4,
      center: myLocation
    }
  );
  const marker = new google.maps.Marker({
    position: myLocation,
    map
  });

  marker.setMap(map);
}


const closeModalForm = (elemID) => {
  const modal = document.getElementById(elemID);
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};

// const closeModal = (elemID) => {
//   document.getElementById(elemID).style.display = 'none';
// };

// const showModal = (elemID) => {
//   document.getElementById(elemID).style.display = 'block';
//   closeModalForm(elemID);
// };

const showButton = () => {
  const btn = document.getElementById('item');
  if (btn.style.display === 'none') {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
};