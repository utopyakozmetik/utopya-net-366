document.addEventListener("DOMContentLoaded", () => {
  // Menü açılır/kapanır
  document.querySelectorAll('.menu > li.has-submenu > a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const parent = link.parentElement;
      // Diğer açık menüleri kapat
      document.querySelectorAll('.menu > li.has-submenu.open').forEach(openItem => {
        if (openItem !== parent) {
          openItem.classList.remove('open');
        }
      });
      // Tıklanan menüyü aç/kapat
      parent.classList.toggle('open');
    });
  });

  // Slider görselleri düzenle
  const slider = document.querySelector('.slider');
  if (slider) {
    const slides = slider.querySelectorAll('.slide');
    slides.forEach(slide => {
      slide.style.height = "auto";
    });
  }

  // Ürün grid yükleme (yolu düzeltildi)
  fetch('./products.json') // index.html ile aynı dizinde olmalı
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
    })
    .catch(err => console.error("Ürünler yüklenemedi:", err));

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

  // Player kontrolleri ve playlist
  const player = document.getElementById('player');
  const playBtn = document.getElementById('play-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const volumeSlider = document.getElementById('volume');
  const playlistToggle = document.getElementById('playlist-toggle');
  const playlist = document.getElementById('playlist');
  const tracks = playlist ? playlist.querySelectorAll('li') : [];

  let currentIndex = 0;

  if (playBtn) playBtn.addEventListener('click', () => player.play());
  if (pauseBtn) pauseBtn.addEventListener('click', () => player.pause());

  if (prevBtn) prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    player.src = tracks[currentIndex].dataset.src;
    player.play();
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % tracks.length;
    player.src = tracks[currentIndex].dataset.src;
    player.play();
  });

  // Volume slider animasyonlu dolum efekti
  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      player.volume = volumeSlider.value;
      const percent = volumeSlider.value * 100;
      volumeSlider.style.background = `linear-gradient(to right, #ff6699 ${percent}%, #333 ${percent}%)`;
    });
  }

  if (playlistToggle) playlistToggle.addEventListener('click', () => {
    playlist.classList.toggle('hidden');
  });

  tracks.forEach((track, index) => {
    track.addEventListener('click', () => {
      currentIndex = index;
      player.src = track.dataset.src;
      player.play();
    });
  });
});
