const loader = document.querySelector('.loader');
const interventions = 'https://ireporter247.herokuapp.com/api/v1/interventions';

const getId = (record) => {
  localStorage.setItem('Id', record.id);
  localStorage.setItem('reportType', record.title);
};

const imgArry = (image) => {
  if (image.length === 0) {
    return 'No Image Uploaded';
  }
  const displayImage = image.map(img => `
  <img src="${img}" alt="" class="item" height="200" width="240">
  `);
  return displayImage;
};


window.addEventListener('load', (event) => {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = './login.html';
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
      <a href="record.html" class="interventions">${imgArry(item.images.slice(0, 1))}</a>
      </div>
      <div class="comment-div"><a href="./record.html" title="intervention" class="comment" id=${item.id} onclick="getId(this)">${item.comment.slice(0, 150)}...</a>
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
      } else {
        loader.style.display = 'none';
        window.location.href = './login.html';
      }
    }).catch((error) => {
      throw error;
    });
});