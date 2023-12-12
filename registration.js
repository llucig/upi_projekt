// registration.js

function register() {
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const address = addressInput.value;
  const phoneNumber = phoneNumberInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validacija podataka
  if (!firstName || !lastName || !email || !address || !phoneNumber || !password || !confirmPassword) {
    alert("Molimo popunite sva polja.");
    return;
  }

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

// Ako se kod izvršava izvan pregledača (npr. u Node.js okruženju)

  module.exports = { register };

