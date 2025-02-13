import { useState } from "react";
import styles from "../styles/Session.module.css";
import Popup from "./Popup"; // Import the new Popup component

const sessionData = {
  "BODYBUILDING":
    "Transform your physique and gain serious muscle at House of Gains, the best gym in Indore. Our expert trainers will craft a personalized bodybuilding plan, ensuring strength, endurance, and peak performance.",
  "CARDIO TRAINING":
    "Burn calories, improve heart health, and boost stamina with high-energy cardio workouts. Whether it’s HIIT, treadmill sprints, or endurance training, we’ve got the best cardio routines to keep you moving.",
  "TOTAL FITNESS":
    "Achieve a balanced, full-body workout with our functional fitness programs. Combining strength, mobility, and flexibility training, this program is perfect for all fitness levels.",
  "CROSSFIT":
    "Push your limits with high-intensity CrossFit workouts. Our classes focus on strength, agility, and endurance using functional movements, making you stronger and more athletic.",
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
