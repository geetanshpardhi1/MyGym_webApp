import { useState } from "react";
import styles from "../styles/Session.module.css";
import Popup from "./Popup"; // Import the new Popup component

const sessionData = {
  "BODY BUILDING":
    "Sculpt your physique and build muscle mass with our specialized bodybuilding programs at FitPhysique. Our expert trainers will guide you through proper techniques and personalized plans.",
  CARDIO:
    "Elevate your heart rate and boost your endurance with our dynamic cardio workouts at FitPhysique. From high-intensity interval training (HIIT) to steady-state cardio, we've got it all.",
  FITNESS:
    "Embrace a holistic approach to fitness with our comprehensive fitness programs at FitPhysique. Our sessions cover strength, flexibility, and functional training to keep you in top shape.",
  CROSSFIT:
    "Experience the ultimate full-body workout with our intense CrossFit classes at FitPhysique. Focus on strength, agility, and endurance through constantly varied functional movements.",
};

const Session = () => {
  const [selectedSession, setSelectedSession] = useState(null);

  return (
    <section className={styles.session}>
      {Object.keys(sessionData).map((title) => (
        <div className={styles.session__card} key={title}>
          <h4>{title}</h4>
          <p>{sessionData[title].slice(0, 100)}...</p>
          <button
            className={`${styles.btn} ${styles.btn__secondary}`}
            onClick={() => setSelectedSession(title)}
          >
            READ MORE <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      ))}

      {selectedSession && (
        <Popup
          title={selectedSession}
          content={sessionData[selectedSession]}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </section>
  );
};

export default Session;
