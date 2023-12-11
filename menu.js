// menu.js
// Popis restorana
const restaurants = [
  {
    name: "McDonald's",
    menu: [
      { name: "Big Mac", description: "Classic burger", price: 5.99 },
      // Dodajte više jela po potrebi
    ],
  },
  {
    name: "KFC",
    menu: [
      {
        name: "Original Recipe Chicken",
        description: "Fried chicken",
        price: 7.99,
      },
      // Dodajte više jela po potrebi
    ],
  },
  // Dodajte više restorana po potrebi
];

// Prikaz jelovnika na temelju odabranog restorana
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantName = urlParams.get("restaurant");
  const restaurant = restaurants.find(
    (r) => r.name.toLowerCase() === restaurantName.toLowerCase()
  );

  if (restaurant) {
    document.getElementById(
      "restaurantName"
    ).textContent = `${restaurant.name} Menu`;

    const menuList = document.getElementById("menuList");
    restaurant.menu.forEach((item) => {
      const menuItem = document.createElement("li");
      menuItem.innerHTML = `<strong>${item.name}</strong><br>${item.description}<br>Cijena: ${item.price} kn<button class="addToCartBtn" onclick="addToCart('${item.name}', '${item.description}', ${item.price})">Dodaj u košaricu</button>`;
      menuList.appendChild(menuItem);
    });
  }
});

function addToCart(name, description, price) {
  const selectedItem = {
    name,
    description,
    price,
  };

  // Spremi odabrani proizvod u košaricu
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(selectedItem);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Proizvod dodan u košaricu!");
}
