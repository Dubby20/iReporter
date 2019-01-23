/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
const reportForm = document.getElementById('reportForm');
const loader = document.querySelector('.loader');
const msgDiv = document.getElementById('msg-error');
const spinner = document.querySelector('.spinner');
const spin = document.querySelector('.spin');

// let getAllRecordsUrl;

// window.addEventListener('load', (event) => {
//   event.preventDefault();
//   const user = JSON.parse(localStorage.getItem('userToken'));
//   const title = document.getElementById('title');
//   const records = document.getElementById('records');

//   const record = (items) => {
//     if (!items.length) {
//       records.innerHTML = 'No post created yet';
//     } else {
//       items.forEach((item) => {
//         const displayRecords = `<div class="media-body">
//         <p class="type">Report Type:<span>${item.reportType}</span></p>
//         <p class="status-p">Status:<span>${item.status}</span></p>
//         <p class="comment">Comment:<span>${item.comment}</span></p>
//         <p class="">Location:<span>${item.location}</span></p>
//       </div>
//         <div class="">
//             <img src="${item.reportImage}" alt="Image Evidence" class="" height="280" width="500">
//           </div>
//           <div>
//             <video width="320" height="240" controls src="${item.reportVideo}"></video>
//           </div>
//           `;
//         records.innerHTML += displayRecords;
//       });
//     }
//   };
// if (redFlagUrl) {
//   getAllRecordsUrl = 'https://ireporter247.herokuapp.com/api/v1/red-flags';
// } else if (interventionUrl) {
//   getAllRecordsUrl = 'https://ireporter247.herokuapp.com/api/v1/interventions';
// }
// fetch(getAllRecordsUrl, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'x-access-token': user.token
//     },
//     mode: 'cors'
//   }).then(response => response.json())
//   .then((data) => {
//     if (data.data.length > 0) {
//       records.appendChild(record);
//     }
//   });
// });

const displayError = (message) => {
  const para = document.createElement('p');
  para.textContent = message;
  para.style.color = 'red';
  para.style.paddingBottom = '8px';
  msgDiv.appendChild(para);
};

// const render = (record) => {
//   const title = document.getElementById('title');
//   if (!record.length) {
//     title.innerHTML = 'No post created yet';
//   } else {
//     const displayRecords = record.map((post, i) => {
//       return `
//        <div class="">
//           <img src="${post.reportImage}" alt="Image Evidence" class="" height="280" width="500">
//         </div>
//         <div>
//           <video width="320" height="240" controls src="${post.reportVideo}"></video>
//         </div>
//         <div class="media-body">
//           <p class="type">Report Type:<span>${post.reportType}</span></p>
//           <p class="">Location:<span>${post.location}</span></p>
//           <p class="status-p">Status:<span>{post.status}</span></p>
//           <p class="comment">Comment:<span>${post.comment}</span></p>
//         </div>`;
//     });
//     records.appendChild(displayRecords);
//   }
// };

const resetForm = () => {
  document.getElementById('comment').value = '';
  document.getElementById('select').value = '';
  document.getElementById('location').innerHTML = '';
  document.getElementById('location-code').innerHTML = '';
  document.getElementById('displayImages').innerHTML = '';
  document.getElementById('displayVideos').innerHTML = '';
};

let postUrl;
let imageUrl;
let videoUrl;

const postRecord = (event) => {
  event.preventDefault();
  const comment = document.getElementById('comment').value;
  const select = document.getElementById('select');
  const reportType = select.options[select.selectedIndex].value;
  const imageInput = document.querySelectorAll('.image-uploads');
  const videoInput = document.querySelectorAll('.video-uploads');
  let location = document.getElementById('location');
  const reportImages = [];
  const reportVideos = [];

  if (!(comment && comment.trim().length)) {
    return displayError('Please enter a comment');
  }

  if (reportType === 'red-flag') {
    postUrl = 'https://ireporter247.herokuapp.com/api/v1/red-flags';
  } else {
    postUrl = 'https://ireporter247.herokuapp.com/api/v1/interventions';
  }

  if (imageInput.length > 0) {
    for (let i = 0; i < imageInput.length; i++) {
      reportImages.push(imageInput[i].innerHTML);
    }
  }

  if (videoInput.length > 0) {
    for (let i = 0; i < videoInput.length; i++) {
      reportVideos.push(videoInput[i].innerHTML);
    }
  }

  if (location) {
    location = location.innerHTML;
  } else {
    return displayError('Please enter a location');
  }

  const info = {
    comment,
    reportType,
    images: reportImages,
    videos: reportVideos,
    location
  };
  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = './index.html';
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
    })
    .then(response => response.json())
    .then((data) => {
      if (data.status === 201) {
        loader.style.display = 'none';
        resetForm();
        localStorage.setItem('urlType', postUrl);
      } else if (data.status === 401 || data.status === 403) {
        loader.style.display = 'none';
        window.location.href = './login.html';
      } else {
        msgDiv.style.display = 'block';
        msgDiv.style.color = 'red';
        loader.style.display = 'none';
        msgDiv.innerHTML = data.error;
      }
    })
    .catch((error) => {
      throw error;
    });
};
const imageUpload = document.getElementById('image-upload');
const errMsg = document.querySelector('.image-msg');

const uploadImage = (event) => {
  spinner.style.display = 'block';
  const displayImages = document.getElementById('displayImages');
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'yftnq9xd');
  // eslint-disable-next-line no-undef
  fetch('https://api.cloudinary.com/v1_1/djdsxql5q/image/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then((data) => {
      if (typeof data.secure_url !== 'undefined') {
        imageUrl = data.secure_url;
        displayImages.innerHTML += `<li class="image-list">
        <img src=${imageUrl} height="50" width="50" id="img"><span class="del-btn">x</span><i class="image-uploads" style="display:none">${imageUrl}</i>

</li>`;
        spinner.style.display = 'none';
        imageUpload.value = '';
        // handleUploads();
      } else {
        spinner.style.display = 'none';
        errMsg.style.display = 'block';
        errMsg.style.color = 'red';
        errMsg.innerHTML = 'Image failed to upload';
      }
    })
    .catch((error) => {
      throw error;
    });
};
const videoUpload = document.getElementById('video-upload');
const errorMsg = document.querySelector('.video-msg');

const uploadVideo = (event) => {
  spin.style.display = 'block';
  const displayVideos = document.getElementById('displayVideos');
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'yftnq9xd');
  // eslint-disable-next-line no-undef
  fetch('https://api.cloudinary.com/v1_1/djdsxql5q/video/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then((data) => {
      if (typeof data.secure_url !== 'undefined') {
        videoUrl = data.secure_url;
        displayVideos.innerHTML += `<li class="video-list"><i class="video-uploads" style="display:none">${videoUrl}</i>
        <video src="${videoUrl}" width="240" height="180" id="video"><span class="del-btn">x</span>
</li>`;
        spin.style.display = 'none';
        videoUpload.value = '';
        // handleUploads();
      } else {
        spinner.style.display = 'none';
        errorMsg.style.display = 'block';
        errorMsg.style.color = 'red';
        errorMsg.innerHTML = 'Video failed to upload';
      }
    })
    .catch((error) => {
      throw error;
    });
};

// const handleUploads = () => {
//   const allImages = document.querySelectorAll('.image-uploads');
//   const allVideos = document.querySelectorAll('.video-uploads');

//   const imageCollection = [];
//   const videoCollection = [];

//   for (let i = 0; i < allImages.length; i++) {
//     imageCollection.push(allImages[i].innerHTML);
//   }
//   localStorage.setItem('saveImageUploads', JSON.stringify(imageCollection));

//   for (let i = 0; i < allVideos.length; i++) {
//     videoCollection.push(allVideos[i].innerHTML);
//   }
//   localStorage.setItem('saveVideoUploads', JSON.stringify(videoCollection));
// };

// window.addEventListener('click', (e) => {
//   if (e.target.className === 'del-btn') {
//     handleUploads();
//   }
// });

imageUpload.addEventListener('change', uploadImage);
videoUpload.addEventListener('change', uploadVideo);
reportForm.addEventListener('submit', postRecord);