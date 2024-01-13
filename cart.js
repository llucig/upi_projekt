document.addEventListener("DOMContentLoaded", function () {
  const paymentCheckboxes = document.querySelectorAll(".paymentCheckbox");
  const cardDetailsSection = document.getElementById("cardDetailsSection");
  const paymentRadios = document.querySelectorAll(".paymentRadio");
  const cardDetailsLabels = document.getElementById("cardDetailsLabels");
  

  paymentCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      resetCardDetails();

      if (this.id === "cardPayment" && this.checked) {
        cardDetailsSection.style.display = "block";
      } else {
        cardDetailsSection.style.display = "none";
      }

      updatePaymentCheckboxesState();
    });
  });

  paymentRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (radio.id === "cardPayment" && radio.checked) {
        cardDetailsLabels.style.display = "block";
      } else {
        cardDetailsLabels.style.display = "none";
      }
    });
  });

  function resetCardDetails() {
    const cardInputs = document.querySelectorAll("#cardDetailsSection input[type='text']");
    cardInputs.forEach(function (input) {
      input.value = "";
    });
  }

  function updatePaymentCheckboxesState() {
    paymentCheckboxes.forEach(function (otherCheckbox) {
      if (!otherCheckbox.checked) {
        otherCheckbox.disabled = !otherCheckbox.disabled;
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const completeOrderButton = document.getElementById("narucivanje");
  if (completeOrderButton) {
    completeOrderButton.addEventListener("click", placeOrder);
  }

  function placeOrder() {
    const paymentMethod = document.querySelector("input[name='paymentMethod']:checked");



    if (paymentMethod.value === "gotovina") {
      alert("Narudžba izvršena!");
      closeModal();
    } else if (paymentMethod.value === "kartica") {
      const cardOwner = document.getElementById("cardOwner").value;
      const cardNumber = document.getElementById("cardNumber").value;
      const cardExpiration = document.getElementById("cardExpiration").value;
      const cardCvv = document.getElementById("cardCvv").value;

      if (cardOwner && cardNumber && cardExpiration && cardCvv) {
        alert("Narudžba izvršena!");
        closeModal();
      } else {
        alert("Molimo ispunite sva polja o kartici!");
      }
    }
  }
  // ... ostatak vašeg koda
});


document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");
  const totalWithDeliveryElement = document.getElementById("totalWithDelivery");
  const deliveryAddressInput = document.getElementById("deliveryAddress");
  const deliveryPhoneNumberInput = document.getElementById("deliveryPhoneNumber");
  const orderButton = document.getElementById("orderButton");
  const downloadCart = document.querySelector(".downloadCart");

  if (orderButton) {
    orderButton.addEventListener("click", openModal );
  }

  function openModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    const changeAddressCheckbox = document.getElementById("changeDeliveryAddress");

    if (changeAddressCheckbox) {
      changeAddressCheckbox.addEventListener("change", handleCheckboxChange);
    }

    const closeButton = document.querySelector(".close");

    if (closeButton) {
      closeButton.addEventListener("click", closeModal);
    }

    window.addEventListener("click", closeModalByOverlay);
  }

  function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    window.removeEventListener("click", closeModalByOverlay);
  }

  function closeModalByOverlay(event) {
    const modal = document.getElementById("myModal");

    if (event.target === modal) {
      modal.style.display = "none";
      window.removeEventListener("click", closeModalByOverlay);
    }
  }

  function handleCheckboxChange() {
    const changeAddressCheckbox = document.getElementById("changeDeliveryAddress");
    const newAddressSection = document.getElementById("newAddressSection");

    if (changeAddressCheckbox.checked) {
      newAddressSection.style.display = "block";
    } else {
      newAddressSection.style.display = "none";
    }
  }
  // ... postojeći JavaScript kod ...



function placeOrder() {
  // Ovdje možete dodati logiku za obradu narudžbe
  // Primjer: spremanje narudžbe, slanje na server itd.

  // Prikazivanje alert poruke
  alert("Narudžba izvršena!");

  // Zatvaranje modalnog prozora
  closeModal();
}
const completeOrderButton = document.getElementById("narucivanje");
  if (completeOrderButton) {
    completeOrderButton.addEventListener("click", placeOrder);
  }


  function updateCart() {
    cartItemsContainer.innerHTML = "";
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
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCart();
      });

      itemElement.appendChild(itemName);
      itemElement.appendChild(itemPriceText);
      itemElement.appendChild(removeButton);

      cartItemsContainer.appendChild(itemElement);
      total += item.price;
    });

    totalPriceElement.textContent = total.toFixed(2);
    totalWithDeliveryElement.textContent = (total + 2).toFixed(2);
  }
  if (downloadCart) {
    downloadCart.addEventListener("click", function () {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!loggedInUser || loggedInUser.email !== "admin@example.com") {
        alert("Morate se prijaviti kao administrator da biste preuzeli podatke o narudžbama!");
        return;
      }
      window.print();
    });
  }

  updateCart();

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

  const storedDeliveryAddress = localStorage.getItem("deliveryAddress");
  const storedDeliveryPhoneNumber = localStorage.getItem("deliveryPhoneNumber");

  if (storedDeliveryAddress) {
    deliveryAddressInput.value = storedDeliveryAddress;
  }

  if (storedDeliveryPhoneNumber) {
    deliveryPhoneNumberInput.value = storedDeliveryPhoneNumber;
  }

  const saveDeliveryDetailsButton = document.getElementById("saveDeliveryDetails");

  if (saveDeliveryDetailsButton) {
    saveDeliveryDetailsButton.addEventListener("click", updateDeliveryDetails);
  }
});

