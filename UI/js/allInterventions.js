const loader = document.querySelector('.loader');

const interventions = 'https://ireporter247.herokuapp.com/api/v1/interventions';


const imgArry = (image) => {
  if (image.length === 0) {
    return 'No Image Uploaded';
  }
  const displayImage = image.map(img => `
  <img src="${img}" alt="" class="item" height="200" width="240">
  `);
  return displayImage;
};

// const videoArry = (video) => {
//   if (video.length === 0) {
//     return 'No Video Uploaded';
//   }
//   const displayVideo = video.map((vid, i) => `
//     <video width="240" height="180" controls>
//       <source src="${vid}">
//     </video>
// `);
//   return displayVideo;
// };

window.addEventListener('load', (event) => {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = '/';
  }
  const recordItems = document.querySelector('.record-items');
  loader.style.display = 'block';

  const record = (items) => {
    if (items.length === 0) {
      recordItems.innerHTML = 'No records Yet';
      recordItems.style.textAlign = 'center';
      recordItems.style.fontSize = '32px';
      recordItems.style.font = 'bold';
    } else {
      items.forEach((item) => {
        const eachRecord = `<li class="list">
        <div>
        <p class="type">Type:<span>Intervention</span></p>
      </div>
      <div id="image-frame">
      <a href="record.html" target="_self">${imgArry(item.images.slice(0, 1))}</a>
      </div>
      <div class="comment-div"><a href="record.html" target="_self"><p class="comment">${item.comment.slice(0, 150)}...</p></a>
   </div>
    </li>
    `;

        recordItems.innerHTML += eachRecord;
      });
    }
  };

  fetch(interventions, {
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
        const recordList = data.data[0].intervention;
        loader.style.display = 'none';
        record(recordList);
        console.log(data);
      } else {
        loader.style.display = 'none';
        window.location.href = '/login';
      }
    }).catch((error) => {
      throw error;
    });
});