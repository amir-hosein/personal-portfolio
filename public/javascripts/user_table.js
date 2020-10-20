/*
  File name: user_table.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 20/10/2020
*/

const update_btn = document.querySelector('.update-user');
const edit_btns = document.querySelectorAll('.edit-user');
const delete_btns = document.querySelectorAll('.delete-user');

const contactToEdit = {};

edit_btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.parentNode.parentNode.parentNode;
    const data = [...row.children];
    contactToEdit.name = data[0].innerHTML,
    contactToEdit.number = data[1].innerHTML,
    contactToEdit.email = data[2].innerHTML
  })
})

update_btn.addEventListener('click', () => {
  fetch('/users/business_contact_list', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...contactToEdit,
      newName: document.querySelector('input[name=name]').value,
      newNumber: document.querySelector('input[name="number"]').value,
      newEmail: document.querySelector('input[name="email"]').value
    })
  })
    .then(() => {
      const row = update_btn.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      const data = [...row.children];
      data[0].innerHTML = document.querySelector('input[name=name]').value;
      data[1].innerHTML = document.querySelector('input[name=number]').value;
      data[2].innerHTML = document.querySelector('input[name=email]').value;
      document.querySelectorAll('.modal.fade').forEach(modal => {
        modal.classList.remove('show');
        modal.style.display = 'none'
      })
      document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.classList.remove('show');
      })
    })
    .catch(console.error)
})

delete_btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const row = btn.parentNode.parentNode;
    const data = [...row.children];
    const body = {
      name: data[0].innerHTML,
      number: data[1].innerHTML,
      email: data[2].innerHTML
    }

    fetch('/users/business_contact_list', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then()
      .catch(console.error)
    
    row.parentNode.removeChild(row);
  })
})