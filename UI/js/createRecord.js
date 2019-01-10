const reportForm = document.getElementById('reportForm');
const loader = document.querySelector('.loader');
const msgDiv = document.getElementById('msg-error');
const records = document.getElementById('records');
const displayError = (message) => {
  const para = document.createElement('p');
  para.textContent = message;
  para.style.color = 'red';
  para.style.padding = '8px';
  msgDiv.appendChild(para);
};

let postUrl;

let recordList = {};
const postRecord = (event) => {
  let user = localStorage.getItem('userToken');
  recordList = user ? JSON.parse(user) : {};
  user = JSON.parse(user);
  console.log(recordList);
  event.preventDefault();
  const comment = document.getElementById('comment').value;
  const select = document.getElementById('select');
  const reportType = select.options[select.selectedIndex].value;
  const location = document.getElementById('location').innerHTML;
  const reportImage = document.querySelectorAll('image-upload');
  const reportVideo = document.querySelectorAll('video-upload');

  const info = {
    comment,
    reportType,
    reportImage,
    reportVideo,
    location
  };
  if (!(comment && comment.trim().length)) {
    return displayError('Please enter a comment');
  }
  if (reportType === 'red-flag') {
    postUrl = 'https://ireporter247.herokuapp.com/api/v1/red-flags';
  } else {
    postUrl = 'https://ireporter247.herokuapp.com/api/v1/interventions';
  }

  if (!location) {
    return displayError('Please enter a location');
  }
  loader.style.display = 'block';
  fetch(postUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token
      },
      mode: 'cors',
      body: JSON.stringify(info)
    }).then(response => response.json())
    .then((result) => {
      console.log(result);
    })
};

const render = (record) => {
  const title = document.getElementById('title');
  if (!record.length) {
    title.innerHTML = 'No post created yet';
  } else {
    const displayRecords = record.map((post, i) => {
      return `
       <div class="">
          <img src="${post.reportImage}" alt="Image Evidence" class="" height="280" width="500">
        </div>
        <div>
          <video width="320" height="240" controls src="${post.reportVideo}"></video>
        </div>
        <div class="media-body">
          <p class="type">Report Type:<span>${post.reportType}</span></p>
          <p class="">Locatione:<span>${post.location}</span></p>
          <p class="status-p">Status:<span>Draft</span></p>
          <p class="comment">Comment:<span>${post.comment}</span></p>
        </div>`;
    });
    records.appendChild(displayRecords);
  }
};
render(recordList);

reportForm.addEventListener('submit', postRecord);