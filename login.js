// login.js
function login(emailInput, passwordInput) {
  const email = emailInput || document.getElementById("email").value;
  const password = passwordInput || document.getElementById("password").value;

  // Dohvati korisnika iz lokalne pohrane
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    alert("Nema registriranog korisnika. Molimo, registrirajte se.");
    return;
  }

  const user = JSON.parse(storedUser);

  // Simulacija provjere autentičnosti
  if (email === user.email && password === user.password) {
    alert("Uspješna prijava!");
  } else {
    alert("Neuspješna prijava. Provjerite svoje podatke."); // Ovdje je promijenjena poruka
  }
}

// Ako se kod izvršava izvan pregledača (npr. u Node.js okruženju)

  module.exports = { login };

