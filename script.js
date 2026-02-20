document.addEventListener("DOMContentLoaded", () => {
  // Menü açılır/kapanır
  document.querySelectorAll('.menu > li.has-submenu > a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const parent = link.parentElement;
      parent.classList.toggle('open');
    });
  });

  // Slider görselleri düzenle
  const slider = document.querySelector('.slider');
  if (slider) {
    const slides = slider.querySelectorAll('.slide');
    slides.forEach(slide => {
      slide.style.width = "600px";
      slide.style.height = "auto";
    });
  }

  // Ürün grid yükleme
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

  // Sepet görseli + ses efekti
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    const cartImg = cartBtn.querySelector('img');
    const cartSound = document.getElementById('cart-sound');
    const addBtn = document.querySelector('.btn.primary');

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        cartImg.src = "images/sepetdolu.webp";
        if (cartSound) {
          cartSound.currentTime = 0;
          cartSound.play();
        }
      });
    }

    document.addEventListener('emptyCart', () => {
      cartImg.src = "images/sepetbos.webp";
    });
  }
});
