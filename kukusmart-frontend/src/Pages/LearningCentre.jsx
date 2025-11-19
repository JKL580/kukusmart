import "./LearningCentre.css";

export default function LearningCentre() {
  const lessons = [
    { id: 1, title: "How to Brood Day-Old Chicks", link: "/lesson/brooding" },
    { id: 2, title: "Feeding Management", link: "/lesson/feeding" },
    { id: 3, title: "Incubation Guide", link: "/lesson/incubation" },
    { id: 4, title: "Recommended Water & Environment", link: "/lesson/water" },
    { id: 5, title: "Connecting With Farmers", link: "/lesson/community" },
  ];

  return (
    <div className="learning-container">
      <h1>Poultry Learning Centre</h1>
      <p className="subtitle">
        Learn poultry keeping step-by-step — suitable for TOTAL BEGINNERS!
      </p>

      <div className="lessons-list">
        {lessons.map((lesson) => (
          <a key={lesson.id} href={lesson.link} className="lesson-card">
            {lesson.title}
          </a>
        ))}
      </div>

      <div className="join-farmers">
        <h3>Join our Farmers Community</h3>
        <p>Share tips and get advice in real time.</p>
        <button className="whatsapp-btn">
          Join via WhatsApp
        </button>
      </div>
    </div>
  );
}
