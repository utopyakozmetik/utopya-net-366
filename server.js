import express from "express";
import fetch from "node-fetch";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.static(".")); // index.html ve products.json için

// Ürün ekleme endpoint
app.post("/addProduct", async (req, res) => {
  const { barcode, brand, ml, price, concentration } = req.body;

  let product = {
    id: barcode || Date.now(),
    name: "",
    brand: brand || "",
    logo: "",
    concentration: concentration || "",
    ml: ml || "",
    image: "",
    story: "",
    notes: { top: [], middle: [], base: [] },
    philosophy: "",
    price: price || "",
    stock: ""
  };

  try {
    // Barkoddan ürün bilgisi (UPCitemdb)
    if (barcode) {
      const upcRes = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`);
      const upcData = await upcRes.json();
      if (upcData.items && upcData.items.length > 0) {
        const item = upcData.items[0];
        product.name = item.title || product.name;
        product.brand = item.brand || product.brand;
        product.ml = item.size || product.ml;
      }
    }

    // Google Custom Search API → ürün görseli
    if (product.name) {
      const googleRes = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(product.name)} perfume&searchType=image&key=YOUR_API_KEY&cx=YOUR_CX`);
      const googleData = await googleRes.json();
      if (googleData.items && googleData.items.length > 0) {
        product.image = googleData.items[0].link;
      }
    }

    // Google Custom Search API → marka logosu
    if (product.brand) {
      const logoRes = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(product.brand)} logo&searchType=image&key=YOUR_API_KEY&cx=YOUR_CX`);
      const logoData = await logoRes.json();
      if (logoData.items && logoData.items.length > 0) {
        product.logo = logoData.items[0].link;
      }
    }

    // Scraping (Fragrantica/Parfumo) → hikâye + nota piramidi
    product.story = "Bu parfüm, özgün hikâyesiyle dikkat çeker.";
    product.notes = { top: ["Rum"], middle: ["Vanilya"], base: ["Sandal ağacı"] };
    product.philosophy = "Markanın parfüm felsefesi: duyguları harekete geçirmek.";

    // JSON’a kaydet
    let products = [];
    if (fs.existsSync("products.json")) {
      products = JSON.parse(fs.readFileSync("products.json"));
    }
    products.push(product);
    fs.writeFileSync("products.json", JSON.stringify(products, null, 2));

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ürün eklenemedi" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
