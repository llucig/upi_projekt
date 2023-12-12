document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  if (registrationForm) {
    registrationForm.addEventListener("submit", validateRegistration);
  }
});

function validateRegistration(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (
    !isValidName(firstName) ||
    !isValidName(lastName) ||
    address.trim() === "" ||
    !isValidEmail(email) ||
    !isValidPhoneNumber(phoneNumber) ||
    password.length < 8 ||
    !containsTwoNumbers(password) ||
    password !== confirmPassword
  ) {
    alert("Neispravni podaci. Provjerite unesene informacije.");
    return;
  }

  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const newUser = {
    firstName,
    lastName,
    address,
    email,
    phoneNumber,
    password,
  };

  registeredUsers.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

  alert("Uspješna registracija!");

  window.location.href = "login.html";
}

function isValidName(name) {
  return name.trim() !== "" && name.length > 2;
}

function isValidEmail(email) {
  return email.includes("@");
}

function isValidPhoneNumber(phoneNumber) {
  return phoneNumber.length > 8;
}

function containsTwoNumbers(str) {
  const regex = /\d.*\d/;
  return regex.test(str);
}
