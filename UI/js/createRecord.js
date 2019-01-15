/* eslint-disable no-restricted-syntax */
const reportForm = document.getElementById('reportForm');
const loader = document.querySelector('.loader');
const msgDiv = document.getElementById('msg-error');
const images = document.querySelectorAll('image-upload');
const videos = document.querySelectorAll('video-upload');

let getAllRecordsUrl;

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
  document.getElementById('select').options.selectedIndex.value = '';
  document.getElementById('location').innerHTML = '';
  document.querySelectorAll('image-upload').values = '';
  document.querySelectorAll('video-upload').values = '';
};

let postUrl;
let imageUrl;

// let recordList = {};
const postRecord = (event) => {
  let user = localStorage.getItem('userToken');
  // recordList = user ? JSON.parse(user) : {};
  event.preventDefault();
  user = JSON.parse(user);
  const comment = document.getElementById('comment').value;
  const select = document.getElementById('select');
  const reportType = select.options[select.selectedIndex].value;
  let location = document.getElementById('location');
  const reportImage = [imageUrl];
  const reportVideo = [];

  if (!(comment && comment.trim().length)) {
    return displayError('Please enter a comment');
  }

  if (reportType === 'red-flag') {
    postUrl = 'https://ireporter247.herokuapp.com/api/v1/red-flags';
  } else {
    postUrl = 'https://ireporter247.herokuapp.com/api/v1/interventions';
  }

  if (images.length > 0) {
    for (const image of images) {
      reportImage.push(images[image].innerHTML);
    }
  }

  if (videos.length > 0) {
    for (const video of videos) {
      reportVideo.push(videos[video].innerHTML);
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
    images: reportImage,
    videos: reportVideo,
    location
  };
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
    .then((data) => {
      if (data.status === 201) {
        loader.style.display = 'none';
        resetForm();
      }
    }).catch((error) => {
      throw error;
    });
};
// render(recordList);
// const displayImage = document.getElementById('displayImage');
// const images = document.getElementsByClassName('image-upload');

const uploadImage = (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'yftnq9xd');
  // eslint-disable-next-line no-undef
  axios({
      url: 'https://api.cloudinary.com/v1_1/djdsxql5q/image/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    })
    .then((response) => {
      document.getElementById('image').src = imageUrl;
      imageUrl = response.data.secure_url;
    })
    .catch((error) => {
      throw error;
    });
};
for (let i = 0; i < images.length; i++) {
  images[i].addEventListener('change', uploadImage, false);
}
// images[image].addEventListener('change', uploadImage, false);
reportForm.addEventListener('submit', postRecord);