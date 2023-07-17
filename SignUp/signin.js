"use strict";

const form = document.getElementById("s-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = e.target;
  const name = `${data.fullname.value}`;
  const email = data.email.value;
  const username = data.username.value;
  const address = data.address.value;
  const password = data.password.value;
  const phone = data.phone.value;
  console.log(name, email, username, address, phone, password);

  const user = JSON.stringify({
    fullName: name,
    email: email,
    userName: username,
    phoneNumber: phone,
    address: address,
    password: data.password.value,
  });

  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "http://localhost:8080/furryfinderfriends/api/v1/auth/signup",
    true
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = xhr.responseText;
        alert("SignUp Successfuly :D");
        window.location.href = "../home_page/index.html";
      } else {
        let x = JSON.parse(xhr.responseText);
        alert(x.message);
        console.log("Request failed with status: " + xhr.status);
      }
    }
  };
  xhr.send(user);
});
