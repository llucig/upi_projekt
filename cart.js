// cart.js
document.addEventListener("DOMContentLoaded", function () {
  displayCart();
});

function displayCart() {
  const cartContainer = document.getElementById("cartContainer");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Košarica je prazna.</p>";
    return;
  }

  let total = 0;

  const cartList = document.createElement("ul");
  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `<strong>${item.name}</strong><br>${item.description}<br>Cijena: ${item.price} kn`;
    cartList.appendChild(cartItem);

    total += item.price;
  });

  // Dodaj dostavu
  total += 2;

  // Dodaj ispis "Dostava 2 eura"
  const deliveryItem = document.createElement("li");
  deliveryItem.textContent = "Dostava 2 eura";
  cartList.appendChild(deliveryItem);

  cartContainer.innerHTML = "";
  cartContainer.appendChild(cartList);

  // Prikazi ukupnu cijenu
  const totalElement = document.createElement("p");
  totalElement.textContent = `Ukupno: ${total} kn`;
  cartContainer.appendChild(totalElement);

  // Dodaj gumb za brisanje košarice
  const clearButton = document.createElement("button");
  clearButton.textContent = "Isprazni košaricu";
  clearButton.addEventListener("click", clearCart);
  cartContainer.appendChild(clearButton);
}

function clearCart() {
  localStorage.removeItem("cart");
  alert("Košarica ispražnjena!");
  displayCart();
}
