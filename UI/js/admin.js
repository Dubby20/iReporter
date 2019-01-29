const loader = document.querySelector('.loader');


window.addEventListener('load', (event) => {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem('userToken'));
  if (!user) {
    window.location.href = './login.html';
  }

  const urls = [
    'https://ireporter247.herokuapp.com/api/v1/interventions',
    'https://ireporter247.herokuapp.com/api/v1/red-flags'
  ];


  loader.style.display = 'block';

  const promises = urls.map(url => fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': user.token
    }
  }).then(response => response.json()));
  Promise.all(promises).then((datas) => {
    loader.style.display = 'none';

    const tablebody = document.getElementById('tablebody');

    const intervention = datas[0].data[0].intervention;
    const interventionDraft = intervention.filter(i => i.status === 'draft').length;
    const interventionUnderInvestigation = intervention.filter(i => i.status === 'under investigation').length;
    const interventionResolved = intervention.filter(i => i.status === 'resolved').length;
    const interventionRejected = intervention.filter(i => i.status === 'rejected').length;

    const redFlag = datas[1].data[0].redFlag;
    const redFlagDraft = redFlag.filter(i => i.status === 'draft').length;
    const redFlagUnderInvestigation = redFlag.filter(i => i.status === 'under investigation').length;
    const redFlagResolved = redFlag.filter(i => i.status === 'resolved').length;
    const redFlagRejected = redFlag.filter(i => i.status === 'rejected').length;

    const merge = intervention.concat(redFlag);
    console.log(merge);
    const totalRecords = merge.length;
    console.log(totalRecords);
    document.getElementById('red-flag-draft').innerHTML = redFlagDraft;
    document.getElementById('red-flag-under-investigation').innerHTML = redFlagUnderInvestigation;
    document.getElementById('red-flag-resolved').innerHTML = redFlagResolved;
    document.getElementById('red-flag-rejected').innerHTML = redFlagRejected;

    document.getElementById('intervention-draft').innerHTML = interventionDraft;
    document.getElementById('intervention-under-investigation').innerHTML = interventionUnderInvestigation;
    document.getElementById('intervention-resolved').innerHTML = interventionResolved;
    document.getElementById('intervention-rejected').innerHTML = interventionRejected;

    const sortedArray = merge.sort((a, b) => a.id - b.id);
    merge.forEach((record) => {
      const eachRecord = `
      <tr>
            <td item-data="ID">${record.id}</td>
            <td item-data="Username">Raymond</td>
            <td item-data="Type">${record.type}</td>
            <td item-data="Record"><button class="view-btn" id=${record.id} onclick="viewReport('modalPage_${record.id}')">View Report</button>
            </td>
            <td item-data="Status"><select name="status" id="select" class="form-control">
                <option value="">${record.status}</option>
                <option value="under investigation">under investigation</option>
                <option value="resolved">resolved</option>
                <option value="rejected">rejected</option>
              </select></td>
              <td>${record.comment}</td>
            <td><button id="update-btn" onclick="updateStatus()">Update Status</button></td>
          </tr>       

`;
      tablebody.insertAdjacentHTML('beforeend', eachRecord);

      ` <div id="modalPage_${record.id}" class="modal"> 
      <div class="modal-content animate">
      <span class="close-btn" onclick="closeBtn()">&times;</span>
      <div class="modal-body">
        <form action="" method="POST">
          <label for="comment">Comment:</label>
          <div class="form-group">
            <textarea name="" id="" cols="20" rows="10" maxlength="2000" required class="form-control">${record.comment}</textarea>
          </div>
          <div class="form-group location-div">
            <p id="location-code">${record.location}</p>
          </div>
          <label for="image">Images:</label>
          <div id="image-frame">
            <ul class="image-layout">
              <li class="image-list">
              ${imgArry(record.images)}
              </li>
            </ul>
          </div>
          <label for="video">Videos:</label>
          <div class="video-frame">
            <ul class="video-layout">
              <li class="video-list">
              ${videoArry(record.videos)}
              </li>
            </ul>
          </div>
        </form>
      </div>
      </div>
      `;
    });
  }).catch((error) => {
    throw error;
  });
});