import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  useEffect(() => {
    const scrollRevealOptions = {
      distance: '50px',
      origin: 'bottom',
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
          <p>Start by taking inspirations, continue it to give inspirations</p>
          <div className="header__btn">
            <button className={`${styles.btn} ${styles.btn__primary}`}>GET STARTED</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
