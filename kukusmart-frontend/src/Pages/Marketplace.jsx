import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "./Marketplace.css";

export default function Marketplace() {
  const [products, setProducts] = useState([]);

  // SAMPLE DATA BEFORE DATABASE
  useEffect(() => {
    setProducts([
      { id: 1, name: "Day Old Chicks", type: "Chicks", price: 80, img: "/assets/placeholder-chicken.jpg" },
      { id: 2, name: "Kienyeji Mature", type: "Mature", price: 650, img: "/assets/placeholder-chicken.jpg" },
      { id: 3, name: "Broiler Feed 70kg", type: "Feed", price: 3500, img: "/assets/placeholder-chicken.jpg" },
      { id: 4, name: "Incubator (60 Eggs)", type: "Equipment", price: 32000, img: "/assets/placeholder-chicken.jpg" },
    ]);
  }, []);

  return (
    <div className="marketplace-container">
      <header>
        <h1>Marketplace</h1>
        <button className="sell-btn">Sell Your Products</button>
      </header>

      <div className="filters">
        <select>
          <option value="">All</option>
          <option value="Chicks">Chicks</option>
          <option value="Mature">Mature</option>
          <option value="Feed">Feed</option>
          <option value="Equipment">Equipment</option>
        </select>

        <input type="text" placeholder="Search product..." />
        <button className="cart-btn">🛒 Cart</button>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
