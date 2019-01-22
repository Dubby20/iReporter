const loader = document.querySelector('.loader');

const redFlag = 'https://ireporter247.herokuapp.com/api/v1/red-flags';

const getId = (record) => {
  localStorage.setItem('Id', record.id);
  localStorage.setItem('reportType', record.title);
};

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

window.addEventListener('load', (event) => {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = '/';
  }
  const recordItems = document.querySelector('.record-items');
  loader.style.display = 'block';

  const record = (items) => {
    items.forEach((item) => {
      const eachRecord = `<li class="list">
      <div>
      <p class="type">Type:<span>Red-Flag</span></p>
    </div>
    <div id="image-frame">
    <a href="" target="_self" class="red-flag">${imgArry(item.images.slice(0, 1))}</a>
    </div>
    <div class="comment-div"><a href="./record.html" title="red-flag" class="comment" id=${item.id} onclick="getId(this)">${item.comment.slice(0, 150)}...</a>
 </div>
</li>
    `;

      recordItems.innerHTML += eachRecord;
    });
  };

  fetch(redFlag, {
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
        const recordList = data.data[0].redFlag;
        loader.style.display = 'none';
        record(recordList);
        console.log(data);
      } else {
        loader.style.display = 'none';
        window.location.href = '/login';
      }
    })
    .catch((error) => {
      throw error;
    });
});