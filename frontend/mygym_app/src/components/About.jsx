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
        <h2 className={styles.section__header}>About House of Gains</h2>
        <p className={styles.section__description}>
          Welcome to House of Gains, the best gym in Indore. Our mission is to provide 
          a fitness experience that helps you push limits, build strength, and achieve 
          your health goals with expert guidance and world-class facilities.
        </p>
      </div>
      <div className={styles.about__grid}>
        <div className={styles.about__card}>
          <h4>🏆 Expert Trainers & Personalized Coaching</h4>
          <p>
            Our certified fitness professionals are dedicated to helping you get stronger, 
            lose weight, or build muscle through personalized workout plans and expert advice.
          </p>
        </div>
        <div className={styles.about__card}>
          <h4>💰 Affordable Membership Plans</h4>
          <p>
            We believe fitness should be accessible to everyone. House of Gains offers budget-friendly 
            membership options with top-tier training, making it the best gym in Indore for fitness lovers.
          </p>
        </div>
        <div className={styles.about__card}>
          <h4>💪 Advanced Equipment & Facilities</h4>
          <p>
            Train with modern gym equipment, dedicated workout zones, and an energizing atmosphere 
            designed to keep you motivated and help you achieve maximum results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
