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
    return (commentError.innerHTML = '<p style="color:red";>Please enter a comment</p>');
  }

  updatedComment.innerHTML = newComment;

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
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 200) {
        document.getElementById('comment').style.display = 'block';
        hideDiv.style.display = 'none';
      } else {
        hideDiv.style.display = 'none';
        commentError.style.display = 'block';
        commentError.style.color = 'red';
        commentError.innerHTML = 'Access denied';
      }
    });
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

const redirect = (reportType) => {
  if (reportType === 'red-flag') {
    window.location.href = './redFlag.html';
  } else if (reportType === 'intervention') {
    window.location.href = './intervention.html';
  }
};

const deleteRecord = () => {
  let recordUrl;

  const user = JSON.parse(localStorage.getItem('userToken'));
  checkToken();
  const reportId = localStorage.getItem('Id');
  const reportType = localStorage.getItem('reportType');
  if (reportType === 'red-flag') {
    recordUrl = `https://ireporter247.herokuapp.com/api/v1/red-flags/${reportId}`;
  } else if (reportType === 'intervention') {
    recordUrl = `https://ireporter247.herokuapp.com/api/v1/interventions/${reportId}`;
  }

  const displayItems = document.querySelector('.display-item');
  const deleteModal = document.getElementById('delete-modal');

  loader.style.display = 'block';


  fetch(recordUrl, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token
      }
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 202) {
        loader.style.display = 'none';
        deleteModal.style.display = 'none';
        displayItems.innerHTML = '';
        const recordType = data.data[0].type;
        redirect(recordType);
      }
    });
}