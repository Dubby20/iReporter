// const location = document.getElementById('location');
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


// location.addEventListener('click', getLocation)