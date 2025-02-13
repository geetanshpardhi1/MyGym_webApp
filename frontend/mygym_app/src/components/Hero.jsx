import React, { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import styles from "../styles/Hero.module.css";
import CalendlyWidget from "./Calendly/CalendlyWidget";
import { RxCross2 } from "react-icons/rx";

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
      <div
        className={`${styles.section__container} ${styles.header__container}`}
      >
        <div className={styles.header__content}>
          <h1>HOUSE OF GAINS</h1>
          <h2>Achieve Your Fitness Goals at the Best Gym in Indore</h2>
          <p>
            Our mission is to deliver an unparalleled fitness experience,
            combining hardcore training with exceptional hospitality, ensuring
            every workout leaves you stronger, motivated, and empowered.
          </p>
          <div className="header__btn">
            <button
              className={`${styles.btn} ${styles.btn__primary}`}
              onClick={() => setShowCalendly(true)} // Show Calendly on button click
            >
              Book a Gym Tour Today!
            </button>
          </div>
        </div>
      </div>
      {showCalendly && (
        <div className={styles.calendly__popup}>
          <div
            className={styles.calendly__overlay}
            onClick={() => setShowCalendly(false)}
          ></div>

          {/* Floating Close Button (Centered) */}
          <button
            className={styles.close__btn}
            onClick={() => setShowCalendly(false)}
          >
            <RxCross2 />
          </button>

          <div className={styles.calendly__modal}>
            <CalendlyWidget />
          </div>
        </div>
      )}
    </header>
  );
};

export default Hero;
