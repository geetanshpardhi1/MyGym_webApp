import React from 'react';

const About = () => {
  return (
    <section className="section__container about__container" id="about">
      <div className="about__header">
        <h2 className="section__header">ABOUT US</h2>
        <p className="section__description">
          Our mission is to inspire and support individuals in achieving their
          health and wellness goals, regardless of their fitness level or
          background.
        </p>
      </div>
      <div className="about__grid">
        <div className="about__card">
          <h4>WINNER COACHES</h4>
          <p>
            We pride ourselves on having a team of dedicated and experienced
            coaches who are committed to helping you succeed.
          </p>
        </div>
        <div className="about__card">
          <h4>AFFORDABLE PRICE</h4>
          <p>
            We believe that everyone should have access to high-quality fitness
            facilities without breaking the bank.
          </p>
        </div>
        <div className="about__card">
          <h4>MODERN EQUIPMENTS</h4>
          <p>
            Stay ahead of the curve with our state-of-the-art equipment designed
            to elevate your workout experience.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
