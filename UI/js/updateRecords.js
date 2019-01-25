alert('update me');


let recordUrl;
saveComment.addEventListener('click', (event) => {
  alert('save me');
  console.log(saveComment);
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem('userToken'));
  checkToken();
  const reportId = localStorage.getItem('Id');
  const reportType = localStorage.getItem('reportType');
  if (reportType === 'red-flag') {
    recordUrl = `https://ireporter247.herokuapp.com/api/v1/red-flags/${reportId}/comment`;
  } else if (reportType === 'intervention') {
    recordUrl = `https://ireporter247.herokuapp.com/api/v1/interventions/${reportId}/comment`;
  }
  const newComment = document.getElementById('comment-area').value;
  const updatedComment = document.getElementById('comment');
  if (!(newComment && newComment.trim().length)) {
    commentError.innerHTML = '<p>Please enter a comment</p>';
  }
  const info = {
    newComment
  };

  fetch(recordUrl, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': user.token
      },
      mode: 'cors',
      body: JSON.stringify(info)
    }).then(response => response.json())
    .then((data) => {
      if (data.status === 200) {
        console.log(data);
        updatedComment.innerHTML = newComment;
      }
    });
});

console.log(saveComment);