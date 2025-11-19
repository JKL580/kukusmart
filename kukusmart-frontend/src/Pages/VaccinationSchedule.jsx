import "./VaccinationSchedule.css";

export default function VaccinationSchedule() {
  const schedule = [
    { age: "Day 1", vaccine: "Marek’s Disease", method: "Injection" },
    { age: "Day 7", vaccine: "Newcastle (ND)", method: "Eye/Nose Drops" },
    { age: "Day 14", vaccine: "Gumboro / IBD", method: "Drinking Water" },
    { age: "Week 4", vaccine: "Fowl Pox", method: "Wing Web" },
    { age: "Week 6", vaccine: "ND Booster", method: "Drinking Water" },
  ];

  return (
    <div className="vaccine-container">
      <h1>Vaccination Schedule</h1>
      <p className="subtitle">Standard Kenyan Poultry Vaccination Guide</p>

      <table className="vaccine-table">
        <thead>
          <tr>
            <th>Age</th>
            <th>Vaccine</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => (
            <tr key={index}>
              <td>{item.age}</td>
              <td>{item.vaccine}</td>
              <td>{item.method}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="note">
        *Always consult a veterinarian before vaccination.
      </p>
    </div>
  );
}
