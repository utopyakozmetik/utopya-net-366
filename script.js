// Parfümler alt menüsü açılır/kapanır
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
fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const grid = document.getElementById('products');
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="image-frame">
          <a href="${p.url}"><img src="${p.image}" alt="${p.title}"></a>
        </div>
        <h3>${p.title}</h3>
        <p>${p.brand}</p>
        <p>${p.price}</p>
        <a href="${p.url}" class="btn outline">Detay</a>
      `;
      grid.appendChild(card);
    });
  });
