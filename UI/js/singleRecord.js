const loader = document.querySelector('.loader');
console.log('Hey there', window.location.search);
// const myFunc = (event) => {
//   const recordId = event.currentTarget.getAttribute('id');
//   console.log(recordId);
// };

// const recordId = document.querySelector('a').getAttribute('id');
// document.querySelector('.testing').innerHTML = recordId;
// console.log(recordId);
// window.addEventListener('click', myFunc);
// window.addEventListener('click', (e) => {
//   if (e.target.className === 'comment') {
//     localStorage.setItem('recordId', e.target.id);
// localStorage.setItem('record-type', 'intervention');
// } else if (e.target.className === 'redflag-link') {
//   localStorage.setItem('recordId', e.target.id);
//   localStorage.setItem('record-type', 'red-flag');
//   }
// });
const imgArry = (image) => {
  if (image.length === 0) {
    return 'No Image Uploaded';
  }
  const displayImage = image.map(
    img => `
  <img src="${img}" alt="" class="item" height="200" width="240">
  `
  );
  return displayImage;
};

const videoArry = (video) => {
  if (video.length === 0) {
    return 'No Video Uploaded';
  }
  const displayVideo = video.map(
    (vid, i) => `
    <video width="240" height="180" controls>
      <source src="${vid}">
    </video>
`
  );
  return displayVideo;
};

let recordUrl;
let recordType;
window.addEventListener('load', (event) => {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = '/login';
  }
  const reportId = localStorage.getItem('Id');
  const reportType = localStorage.getItem('reportType');
  if (reportType === 'red-flag') {
    recordUrl = `https://ireporter247.herokuapp.com/api/v1/red-flags/${reportId}`;
    recordType = 'Red-Flag';
  } else if (reportType === 'intervention') {
    recordUrl = `https://ireporter247.herokuapp.com/api/v1/interventions/${reportId}`;
    recordType = 'Intervention';
  }


  const displayItems = document.querySelector('.display-item');
  loader.style.display = 'block';

  fetch(recordUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token
      },
      mode: 'cors'
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 200) {
        console.log(data);
        // data.data.forEach((item) => {
        const records = data.data[0].report;
        console.log(records.status);
        const {
          status,
          location,
          comment,
          images,
          videos
        } = records;
        const eachRecord = `<li class="list">
          <div>
        <p class="type">Type:<span>${recordType}</span></p>
      </div>
      <div>
      <p class="status-p">Status:<span class="status-type">${status}</span></p>
    </div>
    <div>
      <p id=location-code>Location: <span>${location}</span><a href="#" onclick="getLocation()" class="edit-btn change-location">
      Change location</a></p>
    </div>
    <div class="comment-div">
      <p class="comment">${comment}
        <a class="edit-btn" onclick="showModal('edit-comment')">
          Edit Comment</a>
      </p>
    </div>
    <div id="image-frame">
      <ul class="image-layout">
<li class="image-list">
        ${images}
  </li>

      </ul>
    </div>
    <div class="video-frame">
      <ul class="video-layout">
    <li class="video-list">
        ${videos}
        </li>

      </ul>
    </div>
    <div class="delete-record">
      <button class="bg-red">Delete Record <i class="fas fa-trash fa-color"></i></button>
    </div>
    </li>
    `;
        loader.style.display = 'none';
        displayItems.innerHTML += eachRecord;
        // });
      }
    })
    .catch((error) => {
      throw error;
    });
});