import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import styles from "../styles/About.module.css";

const About = () => {
  useEffect(() => {
    const scrollRevealOptions = {
      distance: "50px",
      origin: "bottom",
      duration: 1500,
    };

    const cards = document.querySelectorAll(`.${styles.about__card}`);

    cards.forEach((card, index) => {
      ScrollReveal().reveal(card, {
        ...scrollRevealOptions,
        delay: index * 500,
      });
    });
  }, []);

  return (
    <section
      className={`${styles.section__container} ${styles.about__container}`}
      id="about"
    >
      <div className={styles.about__header}>
        <h2 className={styles.section__header}>ABOUT US</h2>
        <p className={styles.section__description}>
          Our mission is to inspire and support individuals in achieving their
          health and wellness goals, regardless of their fitness level or
          background.
        </p>
      </div>
      <div className={styles.about__grid}>
        <div className={styles.about__card}>
          <h4>WINNER COACHES</h4>
          <p>
            We pride ourselves on having a team of dedicated and experienced
            coaches who are committed to helping you succeed.
          </p>
        </div>
        <div className={styles.about__card}>
          <h4>AFFORDABLE PRICE</h4>
          <p>
            We believe that everyone should have access to high-quality fitness
            facilities without breaking the bank.
          </p>
        </div>
        <div className={styles.about__card}>
          <h4>MODERN EQUIPMENTS</h4>
          <p>
            Stay ahead of the curve with our state-of-the-art equipment designed
            to elevate your workout experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
