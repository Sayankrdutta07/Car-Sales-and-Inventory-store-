// script.js

// Car Inventory Data
let cars = [
  { model: 'Tesla Model S', stock: 12, price: '$80,000', popularityScore: 0 },
  { model: 'Ford Mustang', stock: 8, price: '$55,000', popularityScore: 0 },
  { model: 'Chevrolet Camaro', stock: 5, price: '$52,000', popularityScore: 0 },
  { model: 'BMW 3 Series', stock: 10, price: '$45,000', popularityScore: 0 }
];

// Car Sales Data
let sales = [
  { model: 'Tesla Model S', year: 2023, soldUnits: 5 },
  { model: 'Ford Mustang', year: 2023, soldUnits: 3 },
  { model: 'Chevrolet Camaro', year: 2022, soldUnits: 2 },
  { model: 'BMW 3 Series', year: 2021, soldUnits: 6 }
];

// Suggested Sports Cars Data (Could be fetched via API, but for now using dummy data)
let suggestedCars = [
  { model: 'Ferrari SF90', price: '$507,000' },
  { model: 'Lamborghini Huracán', price: '$261,000' },
  { model: 'Porsche 911 Turbo S', price: '$207,000' },
  { model: 'McLaren 720S', price: '$299,000' }
];

// Function to initialize the app
function init() {
  // Show welcome popup for 4 seconds
  setTimeout(() => {
    document.getElementById('welcome-popup').classList.add('fade-out');
    setTimeout(() => {
      document.getElementById('welcome-popup').style.display = 'none';
      document.getElementById('home-page').style.display = 'block';
      populateInventory();
      populateSales();
      populateSuggestedCars();
      aiStockMonitor();
    }, 1000);
  }, 3000);
}

// Function to populate car inventory
function populateInventory() {
  const inventoryList = document.getElementById('inventory-list');
  inventoryList.innerHTML = ''; // Clear previous entries
  cars.forEach(car => {
    const carItem = document.createElement('div');
    carItem.classList.add('car-item');
    carItem.innerHTML = `
      <h3>${car.model}</h3>
      <p>Price: ${car.price}</p>
      <p>Stock: ${car.stock} units</p>
      <p>Popularity Score: ${car.popularityScore}</p>
    `;
    inventoryList.appendChild(carItem);
  });
}

// Function to populate sales data
function populateSales() {
  const salesTableBody = document.querySelector('#sales-table tbody');
  salesTableBody.innerHTML = ''; // Clear previous entries
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

// Function to populate suggested sports cars
function populateSuggestedCars() {
  const suggestedCarsList = document.getElementById('suggested-cars-list');
  suggestedCarsList.innerHTML = ''; // Clear previous entries
  suggestedCars.forEach(car => {
    const carItem = document.createElement('div');
    carItem.classList.add('car-item');
    carItem.innerHTML = `
      <h3>${car.model}</h3>
      <p>Price: ${car.price}</p>
    `;
    suggestedCarsList.appendChild(carItem);
  });
}

// AI-Powered Stock Monitor (Automatic Real-Time Tracking)
function aiStockMonitor() {
  setInterval(() => {
    // Loop through each car and analyze stock
    cars.forEach(car => {
      // Track popularity score based on sales data
      const totalSales = sales.filter(sale => sale.model === car.model)
                              .reduce((acc, sale) => acc + sale.soldUnits, 0);
      car.popularityScore = totalSales;

      // Check if stock is low
      if (car.stock < 5) {
        alert(`⚠️ Stock is low for ${car.model}! Only ${car.stock} units left. Consider restocking.`);
      }

      // If popularity is high and stock is low, suggest a restock
      if (car.popularityScore > 5 && car.stock < 5) {
        alert(`🚗 ${car.model} is very popular and selling fast. Stock is below 5 units! Restock soon.`);
      }
    });

    // Update the UI to reflect changes in inventory
    populateInventory();
  }, 5000); // Check every 5 seconds
}

// Function to add a new car to the inventory
function addCar() {
  const carModel = document.getElementById('new-car-model').value;
  const carPrice = document.getElementById('new-car-price').value;
  const carStock = document.getElementById('new-car-stock').value;

  if (carModel && carPrice && carStock) {
    // Add the new car to the inventory array
    cars.push({
      model: carModel,
      price: carPrice,
      stock: parseInt(carStock),
      popularityScore: 0 // New car starts with a popularity score of 0
    });

    // Update the inventory display
    populateInventory();

    // Clear the form
    document.getElementById('add-car-form').reset();

    alert(`🚗 ${carModel} has been added to the inventory successfully!`);
  } else {
    alert('Please fill in all fields to add a new car');
  }
}

// Enhanced Search Function with Autocomplete
function filterCars() {
  const searchValue = document.getElementById('search-input').value.toLowerCase();
  const filteredCars = cars.filter(car => car.model.toLowerCase().includes(searchValue));
  
  const inventoryList = document.getElementById('inventory-list');
  inventoryList.innerHTML = ''; // Clear previous entries
  filteredCars.forEach(car => {
    const carItem = document.createElement('div');
    carItem.classList.add('car-item');
    carItem.innerHTML = `
      <h3>${car.model}</h3>
      <p>Price: ${car.price}</p>
      <p>Stock: ${car.stock} units</p>
      <p>Popularity Score: ${car.popularityScore}</p>
    `;
    inventoryList.appendChild(carItem);
  });
}

// Initialize app after page loads
window.onload = init;
