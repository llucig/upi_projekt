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
    completeOrderButton.addEventListener("click", validateAndPlaceOrder);
  }

  function validateAndPlaceOrder() {
    const paymentMethod = document.querySelector("input[name='paymentOption']:checked");
  
    if (paymentMethod && paymentMethod.id === "cardPayment") {
      const cardOwnerName = document.getElementById("cardOwnerName").value;
      const cardNumber = document.getElementById("cardNumber").value;
      const cardExpiration = document.getElementById("cardExpiration").value;
      const cardCVC = document.getElementById("cardCVC").value;
  
      if (!cardOwnerName || !cardNumber || !cardExpiration || !cardCVC) {
        alert("Molimo popunite sva polja za unos!");
        return;
      }
  
      // Validacija kartičnih podataka
      if (!validateCardDetails()) {
        return;
      }
    } else if (!paymentMethod) {
      alert("Molimo odaberite način plaćanja!");
      return;
    }
  
    // Ovdje možete nastaviti s ostatkom koda za obradu narudžbe
    // Primjer: spremanje narudžbe, slanje na server itd.
  
    // Prikazivanje alert poruke
    alert("Narudžba izvršena!");
  
    // Zatvaranje modalnog prozora
    clearModal();
    updateCart();
  }

  function clearModal() {
    // Postavi sve input elemente unutar modalnog prozora na prazan string
    const modalInputs = document.querySelectorAll("#myModal input[type='text']");
    modalInputs.forEach(function (input) {
      input.value = "";
    });

    // Zatvori sekciju nova adresa za dostavu ako je otvorena
    const newAddressSection = document.getElementById("newAddressSection");
    newAddressSection.style.display = "none";

    // Resetiraj i sakrij detalje kartice
    resetCardDetails();
    cardDetailsLabels.style.display = "none";
  }

  function validateCardDetails() {
  const cardNumber = document.getElementById("cardNumber").value;
  const cardExpiration = document.getElementById("cardExpiration").value;
  const cardCVC = document.getElementById("cardCVC").value;
    
  if (!isValidCardNumber(cardNumber)) {
    alert("Neispravan broj kartice");
    return false;
  }

  if (!isValidCardExpiration(cardExpiration)) {
    
    return false;
  }

  if (!isValidCardCVC(cardCVC)) {
    alert("Neispravan CVV - mora imati točno 3 znamenke");
    return false;
  }

  return true;
}

  function isValidCardNumber(cardNumber) {
    // Implementirajte provjeru duljine i numeričke vrijednosti
    return /^\d{16}$/.test(cardNumber);
  }
  function isValidCardCVC(cardCVC) {
    return /^\d{3}$/.test(cardCVC);
  }

  function isValidCardExpiration(cardExpiration) {
    // Implementirajte provjeru formata MMYY
    const regex = /^(0[1-9]|1[0-2])(\d{2})$/;
    if (!regex.test(cardExpiration)) {
      alert("Neispravan format datuma isteka kartice. Ispravan format je MMYY.");
      return false;
    }
  
    const [, month, year] = cardExpiration.match(regex);
    const currentDate = new Date();
    const expirationDate = new Date(`20${year}`, month - 1);
  
    if (expirationDate < currentDate) {
      alert("Neispravan datum isteka kartice. Kartica je već istekla.");
      return false;
    }
  
    return true;
  }
  
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
    orderButton.addEventListener("click", openModal);
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

  function placeOrder() {
    // Ovdje možete dodati logiku za obradu narudžbe
    // Primjer: spremanje narudžbe, slanje na server itd.

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
