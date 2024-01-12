document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");
  const totalWithDeliveryElement = document.getElementById("totalWithDelivery");
  const deliveryAddressInput = document.getElementById("deliveryAddress");
  const deliveryPhoneNumberInput = document.getElementById(
    "deliveryPhoneNumber"
  );

  function updateCart() {
    cartItemsContainer.innerHTML = ""; // Očisti prikaz košarice

    let total = 0;

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartItems.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cartItem");

      const itemName = document.createElement("h3");
      itemName.textContent = item.name;

      const itemPriceText = document.createElement("p");
      itemPriceText.textContent = `Cijena: ${item.price}€`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "x";
      removeButton.addEventListener("click", function () {
        // Ukloni artikal iz košarice
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Ažuriraj prikaz košarice
        updateCart();
      });

      itemElement.appendChild(itemName);
      itemElement.appendChild(itemPriceText);
      itemElement.appendChild(removeButton);

      cartItemsContainer.appendChild(itemElement);

      // Zbrajaj cijene
      total += item.price;
    });

    // Ažuriraj ukupnu cijenu i ukupno s dostavom
    totalPriceElement.textContent = total.toFixed(2);
    totalWithDeliveryElement.textContent = (total + 2).toFixed(2);
  }

  // Inicijalno ažuriraj košaricu kada se stranica učita
  updateCart();

  // Ažuriranje podataka o dostavi
  function updateDeliveryDetails() {
    const newDeliveryAddress = deliveryAddressInput.value;
    const newDeliveryPhoneNumber = deliveryPhoneNumberInput.value;

    if (newDeliveryAddress && newDeliveryPhoneNumber) {
      // Ažuriraj podatke u lokalnom skladištu
      localStorage.setItem("deliveryAddress", newDeliveryAddress);
      localStorage.setItem("deliveryPhoneNumber", newDeliveryPhoneNumber);

      alert("Podaci o dostavi uspješno ažurirani!");
    } else {
      alert("Molimo unesite ispravne podatke o dostavi.");
    }
  }

  // Dodajemo događaj na gumb za ažuriranje podataka o dostavi
  const updateDeliveryButton = document.querySelector(
    "button[data-action='updateDelivery']"
  );
  if (updateDeliveryButton) {
    updateDeliveryButton.addEventListener("click", updateDeliveryDetails);
  }
  // Učitavanje podataka o dostavi ako postoje
  const storedDeliveryAddress = localStorage.getItem("deliveryAddress");
  const storedDeliveryPhoneNumber = localStorage.getItem("deliveryPhoneNumber");

  if (storedDeliveryAddress) {
    deliveryAddressInput.value = storedDeliveryAddress;
  }

  if (storedDeliveryPhoneNumber) {
    deliveryPhoneNumberInput.value = storedDeliveryPhoneNumber;
  }

  const saveDeliveryDetailsButton = document.getElementById(
    "saveDeliveryDetails"
  );
  if (saveDeliveryDetailsButton) {
    saveDeliveryDetailsButton.addEventListener("click", updateDeliveryDetails);
  }
});
