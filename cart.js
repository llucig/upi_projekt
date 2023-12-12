document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");
  const totalWithDeliveryElement = document.getElementById("totalWithDelivery");

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
});
