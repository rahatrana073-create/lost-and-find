// 1. Get stored items from localStorage or use sample items if empty
let items = JSON.parse(localStorage.getItem('campusItems')) || [
  {
    id: 1,
    name: "Student ID Card",
    category: "ID / Cards",
    status: "Lost",
    location: "Main Library, 1st Floor",
    contact: "rahul@univ.edu",
    date: new Date().toLocaleDateString()
  },
  {
    id: 2,
    name: "Wireless Earbuds (Black)",
    category: "Electronics",
    status: "Found",
    location: "Cafeteria Table 4",
    contact: "security@univ.edu",
    date: new Date().toLocaleDateString()
  }
];

const form = document.getElementById('itemForm');
const itemList = document.getElementById('itemList');
const filterStatus = document.getElementById('filterStatus');

// 2. Render all items to the page
function renderItems() {
  const filter = filterStatus.value;
  itemList.innerHTML = '';

  // Filter items based on dropdown
  const filteredItems = items.filter(item => filter === 'All' || item.status === filter);

  if (filteredItems.length === 0) {
    itemList.innerHTML = `<p class="empty-msg">No items reported under this category.</p>`;
    return;
  }

  filteredItems.forEach((item) => {
    const card = document.createElement('div');
    card.className = `item-card ${item.status.toLowerCase()}`;
    card.innerHTML = `
      <div class="card-top">
        <h3>${item.name}</h3>
        <span class="badge ${item.status.toLowerCase()}">${item.status.toUpperCase()}</span>
      </div>
      <div class="item-details">
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Contact:</strong> ${item.contact}</p>
        <p><strong>Reported On:</strong> ${item.date}</p>
      </div>
      <button class="delete-btn" onclick="deleteItem(${item.id})">Mark as Resolved / Remove</button>
    `;
    itemList.appendChild(card);
  });
}

// 3. Handle form submission to add a new item
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newItem = {
    id: Date.now(),
    name: document.getElementById('itemName').value,
    category: document.getElementById('category').value,
    status: document.getElementById('status').value,
    location: document.getElementById('location').value,
    contact: document.getElementById('contact').value,
    date: new Date().toLocaleDateString()
  };

  items.unshift(newItem); // Add new item to the top
  localStorage.setItem('campusItems', JSON.stringify(items)); // Save to browser

  form.reset(); // Clear input fields
  renderItems(); // Refresh display
});

// 4. Delete/Resolve an item by ID
function deleteItem(id) {
  items = items.filter(item => item.id !== id);
  localStorage.setItem('campusItems', JSON.stringify(items));
  renderItems();
}

// Initial render when page loads
renderItems();
