// Menü açılır/kapanır
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.menu > li > a').forEach(link => {
    link.addEventListener('click', e => {
      const parent = link.parentElement;
      if (parent.querySelector('.submenu')) {
        e.preventDefault();
        parent.classList.toggle('open');
      }
    });
  });

  // Ürünleri JSON’dan çek
  fetch('/products.json')
    .then(res => res.json())
    .then(products => {
      const grid = document.getElementById('products');
      if (!grid) return;
      grid.innerHTML = products.map(p => `
        <div class="product-card">
          <div class="image-frame">
            <a href="${p.url}">
              <img src="${p.image}" alt="${p.title}">
            </a>
          </div>
          <h3>${p.title}</h3>
          <p>${p.brand}</p>
          <p class="price">${p.price}</p>
          <a href="${p.url}" class="btn outline">Detay</a>
        </div>
      `).join('');
    });
});
