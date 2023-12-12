// main.js
document.getElementById("index.html").addEventListener("click", redirectToHome);

function redirectToHome() {
  window.location.href = "index.html";
}

document.getElementById("cartLink").addEventListener("click", viewCart);

function viewCart() {
  alert("Prikaz košarice");
}
// main.js
document.getElementById("cartLink").addEventListener("click", prikaziKosaricu);

function prikaziKosaricu() {
  // Preusmjeri na stranicu košarice
  window.location.href = "cart.html";
}


// Popis restorana
const restaurants = [
  {
    name: "McDonald's",
    menu: [
      {
        name: "Big Mac",
        description: "Classic burger",
        price: 5.99,
      } /* Dodajte više jela */,
    ],
  },
  {
    name: "KFC",
    menu: [
      {
        name: "Original Recipe Chicken",
        description: "Fried chicken",
        price: 7.99,
      } /* Dodajte više jela */,
    ],
  },
  // Dodajte više restorana po potrebi
];

// Generiranje popisa restorana
const restaurantList = document.getElementById("restaurantList");
restaurants.forEach((restaurant) => {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.href = `menu.html?restaurant=${encodeURIComponent(
    restaurant.name.toLowerCase()
  )}`;
  link.textContent = restaurant.name;
  listItem.appendChild(link);
  restaurantList.appendChild(listItem);
});
