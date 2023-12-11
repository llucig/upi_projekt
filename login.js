// login.js
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
    alert("Neuspješna prijava. Provjerite svoje podatke.");
  }
}
