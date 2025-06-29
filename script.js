// Sample data for items
const itemsData = [
  {
    id: 1,
    name: "iPhone Xs",
    description:
      "Warna gold, casing ilustrasi Tuhan Yesus, ada goresan di bagian belakang",
    type: "phone",
    status: "lost",
    location: "Gedung F2.4",
    date: "20 April 2025",
  },
  {
    id: 2,
    name: "Dompet Kulit Coklat",
    description: "Berisi KTP, kartu kredit, dan uang tunai",
    type: "wallet",
    status: "found",
    location: "Gedung Algoritma",
    date: "10 Mei 2025",
  },
  {
    id: 3,
    name: "Kunci Motor",
    description: "Kunci Yamaha XSR, dengan gantungan kunci  ",
    type: "keys",
    status: "lost",
    location: "Parkiran Gedung F",
    date: "28 April 2025",
  },
  {
    id: 4,
    name: "Payung",
    description: "Warna hitam, ukuran sedang",
    type: "others",
    status: "found",
    location: "Edutech",
    date: "21 April 2025",
  },
  {
    id: 5,
    name: "Jam Tangan",
    description: "Warna hijau, dengan tali kulit coklat",
    type: "jewelry",
    status: "lost",
    location: "Toilet gedung G1",
    date: "12 Mei 2025",
  },
  {
    id: 6,
    name: "TWS",
    description: "Merk Anker, warna hitam, ada stiker di casing",
    type: "electronics",
    status: "found",
    location: "Game Corner",
    date: "3 Mei 2025",
  },
];

// DOM Elements
const itemsContainer = document.getElementById("itemsContainer");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const reportForm = document.getElementById("reportForm");

// Render items
function renderItems(items) {
  itemsContainer.innerHTML = "";

  items.forEach((item) => {
    const statusClass =
      item.status === "lost"
        ? "bg-danger bg-opacity-10 text-danger"
        : "bg-success bg-opacity-10 text-success";
    const statusText = item.status === "lost" ? "Hilang" : "Temuan";

    const typeClass =
      item.type === "wallet"
        ? "bg-warning bg-opacity-10 text-warning"
        : item.type === "phone"
        ? "bg-primary bg-opacity-10 text-primary"
        : item.type === "keys"
        ? "bg-secondary bg-opacity-10 text-secondary"
        : item.type === "jewelry"
        ? "bg-purple bg-opacity-10 text-purple"
        : item.type === "bag"
        ? "bg-indigo bg-opacity-10 text-indigo"
        : item.type === "documents"
        ? "bg-yellow bg-opacity-10 text-yellow"
        : "bg-teal bg-opacity-10 text-teal";

    const typeText =
      item.type === "wallet"
        ? "Dompet"
        : item.type === "phone"
        ? "Handphone"
        : item.type === "keys"
        ? "Kunci"
        : item.type === "jewelry"
        ? "Perhiasan"
        : item.type === "bag"
        ? "Tas"
        : item.type === "documents"
        ? "Dokumen"
        : item.type === "electronics"
        ? "Elektronik"
        : "Lainnya";

    const itemElement = document.createElement("div");
    itemElement.className = "col-md-6 col-lg-4";
    itemElement.innerHTML = `
            <div class="item-card card h-100" data-status="${item.status}" data-type="${item.type}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <span class="status-badge ${statusClass}">${statusText}</span>
                        <span class="type-badge ${typeClass}">${typeText}</span>
                    </div>
                    <h3 class="h5 fw-bold mb-2">${item.name}</h3>
                    <p class="text-muted mb-3">${item.description}</p>
                    <div class="d-flex align-items-center text-muted mb-2">
                        <i class="fas fa-map-marker-alt me-2"></i>
                        <small>${item.location}</small>
                    </div>
                    <div class="d-flex align-items-center text-muted mb-4">
                        <i class="fas fa-calendar-alt me-2"></i>
                        <small>${item.date}</small>
                    </div>
                    <button class="btn btn-primary w-100">Hubungi</button>
                </div>
            </div>
        `;

    itemsContainer.appendChild(itemElement);
  });
}

// Filter items
function filterItems(filter) {
  let filteredItems = [...itemsData];

  if (filter !== "all") {
    if (filter === "lost" || filter === "found") {
      filteredItems = filteredItems.filter((item) => item.status === filter);
    } else {
      filteredItems = filteredItems.filter((item) => item.type === filter);
    }
  }

  renderItems(filteredItems);
}

// Search items
function searchItems(query) {
  const filteredItems = itemsData.filter((item) => {
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.location.toLowerCase().includes(query.toLowerCase())
    );
  });

  renderItems(filteredItems);
}

// Event Listeners
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    filterItems(button.dataset.filter);
  });
});

searchButton.addEventListener("click", () => {
  searchItems(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchItems(searchInput.value);
  }
});

reportForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Laporan berhasil dikirim!");
  reportForm.reset();
});

// Initial render
renderItems(itemsData);
