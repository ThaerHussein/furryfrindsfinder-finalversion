"use strict";
let user = localStorage.getItem("user");

if (user) {
  let logForm = document.querySelector("#logForm");
  let signForm = document.querySelector("#signForm");
  let logOut = document.querySelector("#logout");
  let adopte = document.querySelector('#adopte')
  let profile = document.querySelector('#prof')
  logForm.style.display = "none";
  signForm.style.display = "none";
  logOut.style.display = "block";
  adopte.style.display = "block";
  profile.style.display = "block";
}

let logOut = document.querySelector("#logout");
logOut.addEventListener("click", () => {
  localStorage.removeItem("user");
});
