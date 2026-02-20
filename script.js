body {
  margin: 0;
  font-family: 'Parisienne', cursive;
  background: #000 url("images/background/motif.png") repeat top left;
  background-size: auto;
  color: #fff;
}

/* Sidebar logo en sol üst köşe */
.logo-link {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 120px;
  background: url("images/background/logo.png") no-repeat left top;
  background-size: contain;
  z-index: 1000;
}

/* Sidebar menü ikonları */
.sidebar .menu {
  list-style: none;
  padding: 0;
  margin: 140px 0 0 0;
  text-align: left;
}
.sidebar .menu li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.sidebar .menu img {
  max-width: 220px;
  height: auto;
  display: block;
  margin: 6px 0;
}

/* Alt menüler */
.sidebar .submenu {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar .submenu li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.sidebar .has-submenu.open > .submenu {
  display: block;
}

/* Header */
header.hero-title {
  position: fixed;
  top: 0;
  left: 220px;
  width: calc(100% - 220px);
  height: 200px;
  background: transparent;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
}
.header-left {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}
.hero-logo {
  width: 800px;
  height: auto;
  margin-left: -100px;
}

/* Player */
.player-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
  align-items: flex-start;
}
.player-controls button {
  background: rgba(255,255,255,0.1);
  border: none;
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.player-controls input[type=range] {
  -webkit-appearance: none;
  width: 180px;
  height: 6px;
  background: linear-gradient(to right, #ff6699, #333);
  border-radius: 6px;
  outline: none;
  cursor: pointer;
}
.player-controls input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #ff6699;
  cursor: pointer;
}
.player-controls input[type=range]::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #ff6699;
  cursor: pointer;
}

/* Playlist */
.playlist {
  margin-top: 10px;
  background: rgba(255,255,255,0.05);
  padding: 10px;
  border-radius: 8px;
}
.playlist.hidden {
  display: none;
}
.playlist ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.playlist li {
  padding: 6px;
  cursor: pointer;
}
.playlist li:hover {
  background: rgba(255,255,255,0.1);
}

/* Slider */
.slider {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-left: 220px;
  margin-top: 220px;
}
.slider .slide {
  flex: 1 1 30%;
  max-width: 30%;
  height: auto;
  opacity: 0.8;
  border-radius: 12px;
  transition: opacity 0.3s;
}
.slider .slide:hover {
  opacity: 1;
}

/* Ürün grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin: 40px 220px;
}
.product-card {
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  transition: transform 0.3s, opacity 0.3s;
}
.product-card:hover {
  transform: translateY(-6px);
  opacity: 0.9;
}
.product-card img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
.product-card h3 {
  margin: 10px 0 4px;
  font-size: 1.1em;
}
.product-card p {
  margin: 2px 0;
}
.product-card .price {
  font-weight: bold;
  color: #ffcc66;
}
