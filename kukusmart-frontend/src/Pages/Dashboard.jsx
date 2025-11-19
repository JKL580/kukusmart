import { Link } from "react-router-dom";
import "./Dashboard.css"; // optional for styling

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>KukuSmart Dashboard</h1>
        <p>Smart Poultry Management for Kenyan Farmers</p>
        <img
          src="/assets/placeholder-chicken.jpg"
          alt="chicken"
          className="hero-image"
        />
      </section>

      {/* MAIN CARDS */}
      <div className="dashboard-options">
        <Link to="/marketplace" className="dashboard-card">
          <h3>Marketplace</h3>
          <p>Buy / Sell chicks, feed & more</p>
        </Link>

        <Link to="/disease-management" className="dashboard-card">
          <h3>Poultry Disease Management</h3>
          <p>Biosecurity • Symptoms • Cure</p>
        </Link>

        <Link to="/learning-centre" className="dashboard-card">
          <h3>Learning Centre</h3>
          <p>How to rear chicken from day 1</p>
        </Link>
      </div>
    </div>
  );
}
