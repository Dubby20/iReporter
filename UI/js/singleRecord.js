const loader = document.querySelector('.loader');

console.log('Hey there', window.location.search);
// const myFunc = (e) => {
//   // if (e.target.className === 'comment') {
//   const recordId = e.target.parentNode.id;
//   localStorage.setItem('id', recordId);
//   console.log(e.target);
//   console.log(recordId);
//   // }
// };

// window.addEventListener('click', myFunc);
window.addEventListener('click', (e) => {
  if (e.target.className === 'comment') {
    localStorage.setItem('recordId', e.target.id);
    // localStorage.setItem('record-type', 'intervention');
    // } else if (e.target.className === 'redflag-link') {
    //   localStorage.setItem('recordId', e.target.id);
    //   localStorage.setItem('record-type', 'red-flag');
  }
});
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

window.addEventListener('load', (event) => {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = '/login';
  }
  // const reportId = localStorage.getItem('id');
  // const reportUrl = localStorage.getItem('urlType');
  // const redFlagUrl = 'https://ireporter247.herokuapp.com/api/v1/red-flags';
  // const interventionUrl = 'https://ireporter247.herokuapp.com/api/v1/interventions';
  // if (reportUrl === redFlagUrl) {
  //   recordUrl = `${redFlagUrl}/${reportId}`;
  // } else if (reportUrl === interventionUrl) {
  //   recordUrl = `${interventionUrl}/${reportId}`;
  // }

  // if (event.target.className === 'red-flag') {
  //   recordUrl = `https://ireporter247.herokuapp.com/api/v1/red-flags/${recordId}`;
  // } else if (event.target.className === 'interventions') {
  //   recordUrl = `https://ireporter247.herokuapp.com/api/v1/interventions/${recordId}`;
  // }

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
        data.data.forEach((item) => {
          const eachRecord = `<li class="list">
      <div>
      <p class="status-p">Status:<span class="status-type">${item.status}</span></p>
    </div>
    <div>
      <p id=location-code>Location: <span>${item.location}</span></p>
    </div>
    <div class="comment-div">
      <p class="comment">${item.comment}
        <a class="bg-purple" onclick="showModal('edit-red-flag')">
          Edit Comment</a>
      </p>
    </div>
    <div id="image-frame">
      <ul class="image-layout">
<li class="image-list">
        ${imgArry(item.images)}
  </li>

      </ul>
    </div>
    <div class="video-frame">
      <ul class="video-layout">
    <li class="video-list">
        ${videoArry(item.videos)}
        </li>

      </ul>
    </div>
    <div class="delete-record">
      <button class="bg-red">Delete Record <i class="fas fa-trash fa-color"></i></button>
    </div>
    </li>
    `;
          displayItems.innerHTML += eachRecord;
        });
      }
    })
    .catch((error) => {
      throw error;
    });
});