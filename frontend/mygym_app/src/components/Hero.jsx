import React, { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import styles from "../styles/Hero.module.css";
import CalendlyWidget from "./Calendly/CalendlyWidget";


const Hero = () => {
  const [showCalendly, setShowCalendly] = useState(false); // State to toggle Calendly popup

  useEffect(() => {
    const scrollRevealOptions = {
      distance: "50px",
      origin: "bottom",
      duration: 1000,
    };
    ScrollReveal().reveal(`.${styles.header__content} h1`, scrollRevealOptions);
    ScrollReveal().reveal(`.${styles.header__content} h2`, {
      ...scrollRevealOptions,
      delay: 500,
    });
    ScrollReveal().reveal(`.${styles.header__content} p`, {
      ...scrollRevealOptions,
      delay: 1000,
    });
    ScrollReveal().reveal(`.${styles.header__content} .header__btn`, {
      ...scrollRevealOptions,
      delay: 1500,
    });
  }, []);

  return (
    <header className={styles.header} id="header">
      <div className={`${styles.section__container} ${styles.header__container}`}>
        <div className={styles.header__content}>
          <h1>HARD WORK</h1>
          <h2>IS FOR EVERY SUCCESS</h2>
          <p>Start by taking inspiration, continue it to give inspiration</p>
          <div className="header__btn">
            <button
              className={`${styles.btn} ${styles.btn__primary}`}
              onClick={() => setShowCalendly(true)} // Show Calendly on button click
            >
              Book a Gym Tour
            </button>
          </div>
        </div>
      </div>

      {/* Show Calendly widget as a popup */}
      {showCalendly && (
        <div className={styles.calendly__popup}>
          <div className={styles.calendly__overlay} onClick={() => setShowCalendly(false)}></div>
          <div className={styles.calendly__modal}>
            <button className={styles.close__btn} onClick={() => setShowCalendly(false)}>✖</button>
            <CalendlyWidget />
          </div>
        </div>
      )}
    </header>
  );
};

export default Hero;
