/*
  File name: contact.js
  Student: Amir Ghahremani
  Student id: 301073379
  Date: 03/10/2020
*/
const send_btn = document.getElementById("send")

send_btn.addEventListener("click", () => {
  // no page reload
  event.preventDefault()

  // get all the data from the form
  const form_object = {
    firstName: document.getElementById("first-name").value || "",
    lastName: document.getElementById("last-name").value || "",
    email: document.getElementById("email").value || "",
    subject: document.getElementById("subject").value || "",
    message: document.getElementById("message").value || ""
  }

  //creating the query string
  window.location.href = `/?firstName=${form_object.firstName}&lastName=${form_object.lastName}&email=${form_object.email}&subject=${form_object.subject}&message=${form_object.message}`
})