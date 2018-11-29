const editRedFlag = document.getElementById('edit-red-flag');

const locationText = document.getElementById('location-code')


const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    locationText.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  locationText.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}


function initMap() {
  var myLocation = {
    lat: 6.5243793,
    lng: 3.3792057
  };
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 4,
      center: myLocation
    });
  var marker = new google.maps.Marker({
    position: myLocation,
    map: map
  });
}

const closeModalForm = (elemID) => {
  const modal = document.getElementById(elemID);
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
};

const closeModal = (elemID) => {
  document.getElementById(elemID).style.display = 'none';
};

const showModal = (elemID) => {
  document.getElementById(elemID).style.display = 'block';
  closeModalForm(elemID);
};

const showButton = () => {
  const btn = document.getElementById('item');
  if (btn.style.display === "none") {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};