const grid = document.getElementById("productGrid");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const noteFilter = document.getElementById("noteFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");

let products = [];

// JSON’dan ürünleri çek
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  });

// Grid render
function renderProducts(list) {
  grid.innerHTML = list.map(p => `
    <div class="product-card">
      <a href="${p.link}">
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
      </a>
      <p>${p.price} ₺</p>
      <button onclick="addToCart()">Sepete Ekle</button>
    </div>
  `).join("");
}

// Filtreleme
function filterProducts() {
  const query = searchBox.value.toLowerCase();
  const category = categoryFilter.value;
  const note = noteFilter.value;
  const maxPrice = parseInt(priceFilter.value);

  const filtered = products.filter(p => {
    const matchName = p.title.toLowerCase().includes(query);
    const matchCategory = category ? p.category === category : true;
    const matchNote = note ? p.notes.includes(note) : true;
    const matchPrice = p.price <= maxPrice;
    return matchName && matchCategory && matchNote && matchPrice;
  });

  renderProducts(filtered);
}

// Event listeners
searchBox.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
noteFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("input", () => {
  priceValue.textContent = `Maks: ${priceFilter.value} ₺`;
  filterProducts();
});

// Sepet görsel değişimi + ses efekti
function addToCart() {
  const cartIcon = document.getElementById("cartIcon");
  cartIcon.src = "images/sepetdolu.webp";
  const audio = new Audio("music/cart-sound.mp3");
  audio.play();
}
