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
    localStorage.setItem("loggedInUser", JSON.stringify({ email: loginEmail }));
    window.location.href = "mojprofil.html"; // Navigacija na stranicu profila
  } else {
    alert("Neuspješna prijava. Provjerite email i lozinku.");
  }
}
