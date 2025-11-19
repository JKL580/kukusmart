import { Link } from "react-router-dom";
import "./DiseaseManagement.css";

export default function DiseaseManagement() {
  return (
    <div className="disease-container">
      <h1>Poultry Disease Management</h1>
      <p className="subtitle">
        Protect your flock with proper biosecurity, vaccination & knowledge.
      </p>

      <div className="disease-options">
        <Link to="/vaccination-schedule" className="disease-card">
          <h3>Vaccination Schedule</h3>
          <p>Track and follow recommended vaccines</p>
        </Link>

        <Link to="/common-diseases" className="disease-card">
          <h3>Common Diseases</h3>
          <p>Symptoms • Pictures • Treatment</p>
        </Link>

        <Link to="/biosecurity" className="disease-card">
          <h3>Biosecurity</h3>
          <p>How to prevent disease outbreak</p>
        </Link>

        <Link to="/learning-centre" className="disease-card">
          <h3>Learning Centre</h3>
          <p>Best Poultry Practices</p>
        </Link>
      </div>
    </div>
  );
}
