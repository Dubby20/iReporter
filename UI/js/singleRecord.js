const loader = document.querySelector('.loader');

// const imgArry = (image) => {
//   if (image.length === 0) {
//     return 'No Image Uploaded';
//   }
//   const displayImage = image.map(
//     img => `
//   <img src="${img}" alt="" class="item" height="200" width="240">
//   `
//   );
//   return displayImage;
// };

// const videoArry = (video) => {
//   if (video.length === 0) {
//     return 'No Video Uploaded';
//   }
//   const displayVideo = video.map(
//     (vid, i) => `
//     <video width="240" height="180" controls>
//       <source src="${vid}">
//     </video>
// `
//   );
//   return displayVideo;
// };


let recordUrl;
let recordType;

window.addEventListener('load', (event) => {
  event.preventDefault();

  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = './login.html';
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
        const records = data.data[0].report;
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
      <p class="action-btn">Location: <span id="location">${location}</span><a href="#" onclick="getNewLocation()" class="edit-btn change-location">
      Change location</a></p>
    </div>
    <div id="location-error" style="margin:8px";></div>
    <div class="hidden">
    <div class="form-group locate">
    <input type="text" id="input-location" class="form-control"></input>
    </div>
  <button class="c-btn outline" onclick="cancelLocation()">Cancel</button>
  <button class="c-btn primary" onclick="saveLocation()">Update Location</button>
</div>
    <div class="comment-div">
    <p id="comment">${comment}</p>
    <button class="edit-btn action-btn comment-btn" onclick="editComment()">Edit Comment</button>
    </div>
    <div id="comment-error" style="margin:8px";></div>
    <div class="hide-div">
    <div class="form-group">
    <textarea name="comment" id="comment-area" cols="40" rows="10" maxlength="2000" autofocus required class="form-control"></textarea>
  </div>
  <button class="c-btn outline" onclick="cancelComment()">Cancel</button>
  <button class="c-btn primary" onclick="saveComment()">Save Changes</button>
</div>
    <div id="image-frame">
      <ul class="image-layout">
<li class="image-list">
        ${imgArry(images)}
  </li>

      </ul>
    </div>
    <div class="video-frame">
      <ul class="video-layout">
    <li class="video-list">
        ${videoArry(videos)}
        </li>

      </ul>
    </div>
    <div class="delete-record action-btn">
      <button class="trash"><i class="fas fa-trash fa-color fa-2x" onclick="deleteBtn()"></i></button>
    </div>
    </li>

    <div id="delete-modal" class="modal">
    <div class="del-content animate">
      <span class="close-page" onclick="closePage()">&times;</span>
      <div class="del-body">
      <div class="title-background"><h4>Delete Record</h4></div>
        <p class="del-question">Are you sure you want to delete the selected record?</p>
        <hr/>
<div class="display-btn">
<button class="bg-cancel" onclick="cancelDelete()">Cancel</button>
<button class="bg-red" onclick="deleteRecord()">Delete</button>
</div>
      </div>
    </div>

  </div>

    `;
        loader.style.display = 'none';
        // checkUser();
        displayItems.innerHTML += eachRecord;
      }
    })
    .catch((error) => {
      throw error;
    });
});