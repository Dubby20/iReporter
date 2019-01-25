const showNewPosition = (position) => {
  const newLocation = document.getElementById('input-location');
  newLocation.value = `${position.coords.latitude}, ${position.coords.longitude}`;
};

const getNewLocation = () => {
  const hidden = document.querySelector('.hidden');
  const newLocation = document.getElementById('input-location');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showNewPosition);
    hidden.style.display = 'block';
  } else {
    newLocation.value = 'Geolocation is not supported by this browser.';
  }
};

const cancelLocation = () => {
  const hidden = document.querySelector('.hidden');
  const newLocation = document.getElementById('input-location');
  newLocation.value = '';
  hidden.style.display = 'none';
};

const saveLocation = () => {
  const locationError = document.getElementById('location-error');
  let recordUrl;

  const user = JSON.parse(localStorage.getItem('userToken'));
  checkToken();
  const reportId = localStorage.getItem('Id');
  const reportType = localStorage.getItem('reportType');
  if (reportType === 'red-flag') {
    recordUrl = `https://ireporter247.herokuapp.com/api/v1/red-flags/${reportId}/location`;
  } else if (reportType === 'intervention') {
    recordUrl = `https://ireporter247.herokuapp.com/api/v1/interventions/${reportId}/location`;
  }
  const newLocation = document.getElementById('input-location').value;
  const updatedLocation = document.getElementById('location');
  const hidden = document.querySelector('.hidden');
  if (!(newLocation && newLocation.trim().length)) {
    return (locationError.innerHTML = '<p style="color:red";>Please choose a location</p>');
  }

  updatedLocation.innerHTML = newLocation;
  // document.getElementById('comment').style.display = 'block';

  const info = {
    location: newLocation
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
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 200) {
        hidden.style.display = 'none';
        console.log(data);
      } else {
        hidden.style.display = 'none';
        locationError.style.display = 'block';
        locationError.style.color = 'red';
        locationError.innerHTML = 'Access denied';
      }
    });
};