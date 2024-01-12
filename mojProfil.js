


document.addEventListener("DOMContentLoaded", function () {
  const profileContainer = document.querySelector(".profile-container");
  const cartDetailsContainer = document.querySelector(".cart-details");
  const cartItemsContainer = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");

  function displayUserProfile() {
    const currentUser = getCurrentUser();

    if (currentUser) {
      document.getElementById("firstName").innerText = currentUser.firstName;
      document.getElementById("lastName").innerText = currentUser.lastName;
      document.getElementById("address").innerText = currentUser.address;
      document.getElementById("email").innerText = currentUser.email;
      document.getElementById("phoneNumber").innerText = currentUser.phoneNumber;
    }
  }

  function displayCartDetails() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (cartItems.length > 0) {
      cartItemsContainer.innerHTML = ""; // Očisti prikaz košarice

      let total = 0;

      cartItems.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cartItem");

        const itemName = document.createElement("h3");
        itemName.textContent = item.name;

        const itemPriceText = document.createElement("p");
        itemPriceText.textContent = `Cijena: ${item.price}€`;

        itemElement.appendChild(itemName);
        itemElement.appendChild(itemPriceText);

        cartItemsContainer.appendChild(itemElement);

        // Zbrajaj cijene
        total += item.price;
      });

      // Ažuriraj ukupnu cijenu
      totalPriceElement.textContent = total.toFixed(2);

      // Prikazi podatke o košarici
      cartDetailsContainer.style.display = "block";
    } else {
      // Sakrij podatke o košarici ako je prazna
      cartDetailsContainer.style.display = "none";
    }
  }

  // Inicijalno prikaži podatke o korisniku i košarici
  displayUserProfile();
  displayCartDetails();
  const logoutBtn = document.querySelector(".logout-btn");
  logoutBtn.addEventListener("click", logout);

  displayUserProfile(); // Prikazi podatke o korisniku kada se stranica učita
});

function displayUserProfile() {
  const currentUser = getCurrentUser();

  if (currentUser) {
    document.getElementById("firstName").innerText = currentUser.firstName;
    document.getElementById("lastName").innerText = currentUser.lastName;
    document.getElementById("address").innerText = currentUser.address;
    document.getElementById("email").innerText = currentUser.email;
    document.getElementById("phoneNumber").innerText = currentUser.phoneNumber;
  }
}

function getCurrentUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    return registeredUsers.find((user) => user.email === loggedInUser.email);
  }

  return null;
}


function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html"; // Navigacija na stranicu za prijavu
}


function promijeniLozinku() {
  // Dobavljanje vrijednosti polja za unos starih i novih lozinki
  var oldPassword = document.getElementById("oldPassword").value;
  var newPassword = document.getElementById("newPassword").value;

  // Provjera valjanosti starih i novih lozinki (ovdje možete dodati dodatne provjere)

  const currentUser = getCurrentUser();

  if (currentUser && oldPassword === currentUser.password) {
    // Simulacija promjene lozinke (ovdje dodajte svoju logiku za stvarnu promjenu lozinke)
    currentUser.password = newPassword;

    // Ažuriranje lokalne pohrane
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const updatedUsers = registeredUsers.map(user => {
      if (user.email === currentUser.email) {
        return currentUser;
      }
      return user;
    });

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    alert("Lozinka uspješno promijenjena!");
  } else {
    alert("Pogrešna stara lozinka. Molimo pokušajte ponovo.");
  }
}
function obrisiProfil() {
  const currentUser = getCurrentUser();

  if (currentUser) {
    const confirmed = confirm("Jeste li sigurni da želite obrisati svoj profil?");

    if (confirmed) {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const updatedUsers = registeredUsers.filter(user => user.email !== currentUser.email);

      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      localStorage.removeItem("loggedInUser");

      alert("Profil uspješno obrisan. Bit ćete preusmjereni na stranicu za prijavu.");
      window.location.href = "login.html";
    }
  } else {
    alert("Nije moguće pronaći trenutno prijavljenog korisnika.");
  }
}