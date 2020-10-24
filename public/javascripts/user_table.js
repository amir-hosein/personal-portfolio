/*
  File name: user_table.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 20/10/2020
*/

const update_btn = document.querySelector('.update-user');
const edit_btns = document.querySelectorAll('.edit-user');
const delete_btns = document.querySelectorAll('.delete-user');

edit_btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.parentNode.parentNode;
    const data = [...row.children];
    contactToEdit.name = data[0].innerHTML,
    window.location.href = `./business_contact_list/${data[0].innerHTML}`;
  })
})

delete_btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.parentNode.parentNode;
    const data = [...row.children];
    const body = {
      username: data[0].innerHTML,
    }

    fetch('/user/business_contact_list', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => console.log('delete'))
      .catch(console.error)
    
    row.parentNode.removeChild(row);
  })
})