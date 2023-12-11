// registration.js
function register() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validacija podataka
  if (password !== confirmPassword) {
    alert("Lozinke se ne podudaraju");
    return;
  }

  // Spremi korisnika u lokalno pohranu
  const user = {
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    password,
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert(
    `Registracija uspješna!\nIme: ${firstName}\nPrezime: ${lastName}\nEmail: ${email}\nAdresa: ${address}\nBroj mobitela: ${phoneNumber}`
  );
}
