document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById('player');
  const volumeSlider = document.getElementById('volume');

  // Volume slider animasyonlu dolum efekti
  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      player.volume = volumeSlider.value;
      const percent = volumeSlider.value * 100;
      volumeSlider.style.background = `linear-gradient(to right, #ff6699 ${percent}%, #333 ${percent}%)`;
    });
  }

  // Playlist toggle
  const playlistToggle = document.getElementById('playlist-toggle');
  const playlist = document.getElementById('playlist');
  if (playlistToggle) {
    playlistToggle.addEventListener('click', () => {
      playlist.classList.toggle('hidden');
    });
  }

  // Track seçim
  const tracks = playlist ? playlist.querySelectorAll('li') : [];
  let currentIndex = 0;
  tracks.forEach((track, index) => {
    track.addEventListener('click', () => {
      currentIndex = index;
      player.src = track.dataset.src;
      player.play();
    });
  });

  // Önceki/sonraki tuşları
  document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    player.src = tracks[currentIndex].dataset.src;
    player.play();
  });
  document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (