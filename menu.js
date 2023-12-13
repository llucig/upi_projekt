document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".addToCart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const parentItem = button.closest(".item, .item2, .item3, .item4, .item5, .item6, .item7, .item8, .item9, .item10");

      // Provjeri postojanje potrebnih elemenata
      const itemNameElement = parentItem.querySelector("h3");
      const itemDescriptionElement =
        parentItem.querySelector(".item-description");
      const itemPriceElement = parentItem.querySelector(".item-price");

      if (!itemNameElement || !itemDescriptionElement || !itemPriceElement) {
        console.error("Nisu pronađeni svi potrebni elementi.");
        return;
      }

      const itemName = itemNameElement.textContent;
      const itemDescription = itemDescriptionElement.textContent;

      // Dohvati cijenu iz atributa data-price
      const itemPrice = parseFloat(itemPriceElement.dataset.price) || 0;

      // Prikazi alert s podacima
      alert(
        `${itemName}\n${itemDescription}\nCijena: $${itemPrice.toFixed(2)}`
      );

      // Spremi podatke u lokalno pohranište
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.push({
        name: itemName,
        description: itemDescription,
        price: itemPrice,
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
  });
});
