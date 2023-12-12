document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});

function handleLogin(event) {
  event.preventDefault();

  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;

  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const user = registeredUsers.find(
    (user) => user.email === loginEmail && user.password === loginPassword
  );

  if (user) {
    alert(`Uspješna prijava!\nEmail: ${loginEmail}\nLozinka: ${loginPassword}`);
    window.location.href = "index.html";
  } else {
    alert("Neuspješna prijava. Provjerite email i lozinku.");
  }
}
