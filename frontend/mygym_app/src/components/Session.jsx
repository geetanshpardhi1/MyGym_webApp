import styles from "../styles/Session.module.css"
const Session = () => {
  return (
    <section className={styles.session}>
      <div className={styles.session__card}>
        <h4>BODY BUILDING</h4>
        <p>
          Sculpt your physique and build muscle mass with our specialized
          bodybuilding programs at FitPhysique.
        </p>
        <button className={`${styles.btn} ${styles.btn__secondary}`}>
          READ MORE <i className="ri-arrow-right-line"></i>
        </button>
      </div>
      <div className={styles.session__card}>
        <h4>CARDIO</h4>
        <p>
          Elevate your heart rate and boost your endurance with our dynamic
          cardio workouts at FitPhysique.
        </p>
        <button className={`${styles.btn} ${styles.btn__secondary}`}>
          READ MORE <i className="ri-arrow-right-line"></i>
        </button>
      </div>
      <div className={styles.session__card}>
        <h4>FITNESS</h4>
        <p>
          Embrace a holistic approach to fitness with our comprehensive fitness
          programs at FitPhysique.
        </p>
        <button className={`${styles.btn} ${styles.btn__secondary}`}>
          READ MORE <i className="ri-arrow-right-line"></i>
        </button>
      </div>
      <div className={styles.session__card}>
        <h4>CROSSFIT</h4>
        <p>
          Experience the ultimate full-body workout with our intense CrossFit
          classNamees at FitPhysique.
        </p>
        <button className={`${styles.btn} ${styles.btn__secondary}`}>
          READ MORE <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </section>
  );
};

export default Session;
