/*
  File name: edit_user.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 24/10/2020
*/

const deleteBtn = document.querySelector('.delete-user-edit-page');
const cancelBtn = document.querySelector('.cancel');

deleteBtn.addEventListener('click', () => {
  //get endpoint
  const urlPath = window.location.pathname.split('/');
  const urlPathLen = urlPath.length;

  //fetch call to delete the user
  fetch(`/user/business_contact_list/${urlPath[urlPathLen - 1]}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: urlPath[urlPathLen - 1]
    })
  })
    .then((response) => response.json())
    .then(({ url }) => window.location.href = url)
    .catch(console.error)
})

cancelBtn.addEventListener('click', () => {
  window.location.href = '/user/business_contact_list';
})