"use strict";


function generateCard(x) {
  let card = document.createElement("div");
  card.classList.add("card");

  card.addEventListener("mouseleave", () => {
    card.classList.remove("flip");
  });

  let face = document.createElement("div");
  face.classList.add("face");

  let but = document.createElement("button");
  but.innerText = "More Details";
  but.classList.add("but");
  but.id = "more-details";

  but.addEventListener("click", () => {
    let card = but.parentElement.parentElement;
    console.log(card);
    card.classList.add("flip");
  });

  face.appendChild(but);

  let back = document.createElement("div");
  back.classList.add("back");

  card.appendChild(face);
  card.appendChild(back);

  x.appendChild(card);
}

// let body = document.querySelector("#cards");
// for (let i = 0; i < 10; i++) {
//   generateCard(body);
// }
