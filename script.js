// script.js

// Car Inventory Data
const cars = [
  { model: 'Tesla Model S', stock: 12, price: '$80,000' },
  { model: 'Ford Mustang', stock: 8, price: '$55,000' },
  { model: 'Chevrolet Camaro', stock: 5, price: '$52,000' },
  { model: 'BMW 3 Series', stock: 10, price: '$45,000' }
];

// Car Sales Data
const sales = [
  { model: 'Tesla Model S', year: 2023, soldUnits: 5 },
  { model: 'Ford Mustang', year: 2023, soldUnits: 3 },
  { model: 'Chevrolet Camaro', year: 2022, soldUnits: 2 },
  { model: 'BMW 3 Series', year: 2021, soldUnits: 6 }
];

// Function to initialize the app
function init() {
  // Show welcome popup for 4 seconds
  setTimeout(() => {
    document.getElementById('welcome-popup').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
  }, 4000);

  // Populate car inventory
  const inventoryList = document.getElementById('inventory-list');
  cars.forEach(car => {
    const carItem = document.createElement('div');
    carItem.classList.add('car-item');
    carItem.innerHTML = `
      <h3>${car.model}</h3>
      <p>Price: ${car.price}</p>
      <p>Stock: ${car.stock} units</p>
    `;
    inventoryList.appendChild(carItem);
  });

  // Populate sales data
  const salesTableBody = document.querySelector('#sales-table tbody');
  sales.forEach(sale => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sale.model}</td>
      <td>${sale.year}</td>
      <td>${sale.soldUnits}</td>
    `;
    salesTableBody.appendChild(row);
  });
}

// Initialize app after page loads
window.onload = init;
