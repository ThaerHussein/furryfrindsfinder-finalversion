"use strict";

let login = document.querySelector("#l-form");
login.addEventListener("submit", (e) => {
  e.preventDefault();
  const { email, pass } = e.target;
  const mail = email.value;
  const pas = pass.value;
  const user = {
    username: mail,
    password: pas,
  };

  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "http://localhost:8080/furryfinderfriends/api/v1/auth/login",
    true
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        let userData = response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "../home_page/index.html";
      } else {
        let x = JSON.parse(xhr.responseText);
        alert(x.message);
      }
    }
  };
  xhr.send(JSON.stringify(user));
});
