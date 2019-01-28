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
  });
});