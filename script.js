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

  // Slider görsellerini düzenle
  const slider = document.querySelector('.slider');
  if (slider) {
    const slides = slider.querySelectorAll('.slide');
    slides.forEach(slide => {
      slide.style.width = "600px";   // 2 kat büyütülmüş boyut
      slide.style.height = "auto";
    });
  }

  // Ürünleri JSON’dan çek ve grid’e yerleştir
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

  // Ürün detay sayfası düzeni (örnek: sepete ekle butonu)
  const addBtn = document.querySelector('.btn.primary');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      alert("Ürün sepete eklendi!");
      // Burada sepet görselini değiştirme veya event tetikleme yapılabilir
      const cartLink = document.querySelector('.top-nav a[href="cart.html"]');
      if (cartLink) {
        cartLink.classList.add('cart-full'); // CSS ile dolu sepet görseli ayarlanabilir
      }
    });
  }
});
