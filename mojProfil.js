document.addEventListener("DOMContentLoaded", function () {
  const profileContainer = document.querySelector(".profile-container");
  const orderDetailsContainer = document.getElementById("orderDetails");
  const orderItemsContainer = document.getElementById("orderItems");
  const orderTotalPriceElement = document.getElementById("orderTotalPrice");
  const deliveryAddressInput = document.getElementById("deliveryAddress");
  const deliveryPhoneNumberInput = document.getElementById("deliveryPhoneNumber");

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

  function displayOrderDetails() {
    const orderItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (orderItems.length > 0) {
      orderItemsContainer.innerHTML = "";

      let total = 0;

      orderItems.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("orderItem");

        const itemName = document.createElement("h3");
        itemName.textContent = item.name;

        const itemPriceText = document.createElement("p");
        itemPriceText.textContent = `Cijena: ${item.price}€`;

        itemElement.appendChild(itemName);
        itemElement.appendChild(itemPriceText);

        orderItemsContainer.appendChild(itemElement);

        total += item.price;
      });
      total += 2;

      orderTotalPriceElement.textContent = total.toFixed(2);
      orderDetailsContainer.style.display = "block";
    } else {
      orderDetailsContainer.style.display = "none";
    }
  }

  function getCurrentUser() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      return registeredUsers.find((user) => user.email === loggedInUser.email);
    }

    return null;
  }

  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  }

  function promijeniLozinku() {
    var oldPassword = document.getElementById("oldPassword").value;
    var newPassword = document.getElementById("newPassword").value;

    const currentUser = getCurrentUser();

    if (currentUser && oldPassword === currentUser.password) {
      currentUser.password = newPassword;

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

  function updateDeliveryDetails() {
    const newDeliveryAddress = deliveryAddressInput.value;
    const newDeliveryPhoneNumber = deliveryPhoneNumberInput.value;

    if (newDeliveryAddress && newDeliveryPhoneNumber) {
      localStorage.setItem("deliveryAddress", newDeliveryAddress);
      localStorage.setItem("deliveryPhoneNumber", newDeliveryPhoneNumber);

      alert("Podaci o dostavi uspješno ažurirani!");
    } else {
      alert("Molimo unesite ispravne podatke o dostavi.");
    }
  }

  const updateDeliveryButton = document.querySelector("button[data-action='updateDelivery']");
  if (updateDeliveryButton) {
    updateDeliveryButton.addEventListener("click", updateDeliveryDetails);
  }

  displayUserProfile();
  displayOrderDetails();

  const logoutBtn = document.querySelector(".logout-btn");
  logoutBtn.addEventListener("click", logout);
});
