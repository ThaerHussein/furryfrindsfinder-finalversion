"use strict";
let user = localStorage.getItem("user");
let userD = JSON.parse(user);

if (user) {
  let logOut = document.querySelector("#lo");
  let adopte = document.querySelector("#adopte");
  let profile = document.querySelector("#profile");
  logOut.style.display = "block";
  adopte.style.display = "block";
  profile.style.display = "block";
}

let logOut = document.querySelector("#lo");
logOut.addEventListener("click", () => {
  localStorage.removeItem("user");
});

let body = document.querySelector("#cards");

document.addEventListener("DOMContentLoaded", function () {
  let xhr = new XMLHttpRequest();
  let url = "http://localhost:8080/furryfinderfriends/api/v1/user/animal";
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/xml");
  xhr.setRequestHeader("Authorization", userD.token);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let response = JSON.parse(xhr.responseText).data;
        for (let i = 0; i < response.length; i++) {
          generateCard(body, response[i]);
        }
      } else {
        console.log("Request failed with status: " + xhr.status);
      }
    }
  };
  xhr.send();
});

function generateCard(x, data) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = data.id;
  card.addEventListener("mouseleave", () => {
    card.classList.remove("flip");
  });
  let face = document.createElement("div");
  face.classList.add("face");
  console.log(data);
  face.style.backgroundImage = `url(${`https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*`})`;
  let but = document.createElement("button");
  but.innerText = "More Details";
  but.classList.add("but");
  but.id = "more-details";
  but.addEventListener("click", () => {
    let card = but.parentElement.parentElement;
    card.classList.add("flip");
    localStorage.setItem("id", data.id);
  });
  face.appendChild(but);
  let back = document.createElement("div");
  back.classList.add("back");
  generateBack(back, data);
  card.appendChild(face);
  card.appendChild(back);
  x.appendChild(card);
}

function generateBack(back, data) {
  let catName = document.createElement("h2");
  catName.textContent = data.name;
  back.appendChild(catName);
  let ul = document.createElement("ul");
  let listItems = [
    `Type: ${data.type}`,
    `Food: ${data.typeOfFood}`,
    `Favorite Toy: ${data.favoritePlayToys}`,
    `Age: ${data.age}`,
    `Weight: ${data.weight}`,
  ];
  listItems.forEach(function (itemText) {
    let li = document.createElement("li");
    li.textContent = itemText;
    ul.appendChild(li);
  });
  back.appendChild(ul);
  let button = document.createElement("button");
  button.className = "but-adp";
  button.textContent = "Adopt";
  button.addEventListener("click", () => {
    submit(data.id);
  });
  back.appendChild(button);
}

function submit(id) {
  console.log(id);
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  const adpSubmit = document.createElement("div");
  adpSubmit.classList.add("adp-submit");
  const submitTilte = document.createElement("p");
  submitTilte.textContent = "Press submit if you want to continue !";
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", (e) => {
    let xhr = new XMLHttpRequest();
    let url = `http://localhost:8080/furryfinderfriends/api/v1/user/adopt/submit?animalId=${id}`;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/xml");
    xhr.setRequestHeader("Authorization", userD.token);
    xhr.onreadystatechange = function () {
      if (xhr.status === 200) {
        alert("The request has been submitted");
        overlay.remove();
      } else {
        alert("Somthing wrong with the request please try later");
        overlay.remove();
      }
    };
    xhr.send();
  });
  const cancelButton = document.createElement("button");
  cancelButton.addEventListener("click", () => {
    overlay.remove();
  });
  cancelButton.textContent = "Cancel";
  adpSubmit.appendChild(submitButton);
  adpSubmit.appendChild(cancelButton);
  adpSubmit.appendChild(submitTilte);
  overlay.appendChild(adpSubmit);
  document.body.appendChild(overlay);
}
