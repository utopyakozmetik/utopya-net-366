fetch('/products.json')
  .then(res => res.json())
  .then(products => {
    const grid = document.getElementById('products');
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.brand}</p>
        <p>${p.price}</p>
        <a href="${p.url}" class="btn outline">Detay</a>
      `;
      grid.appendChild(card);
    });
  });
