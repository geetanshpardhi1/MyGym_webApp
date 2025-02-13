import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
import "../App.css";
import styles from "../styles/Client.module.css"
import client1 from "../assets/client-1.jpg";
import client2 from "../assets/client-2.jpg";
import client3 from "../assets/client-3.jpg";

const Clients = () => {
  return (
    <section className={`${styles.section__container} ${styles.client__container}`} id="client">
      <h2 className={styles.section__header}>WHY WE ARE THE BEST GYM IN INDORE</h2>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        className={styles.swiper}
      >
        <SwiperSlide>
          <div className={styles.client__card}>
            <img src={client1} alt="Happy gym member at House of Gains - Best Gym in Indore" />
            <div>
              <i className="ri-double-quotes-r"></i>
            </div>
            <p>
              "I've been training at <strong>House of Gains</strong> for over a year, and it's truly the. The trainers are highly skilled, the facilities are top-notch, 
              and the workout environment keeps me motivated every day!"
            </p>
            <h4>Sarah Johnson</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.client__card}>
            <img src={client2} alt="Satisfied gym client at House of Gains in Indore" />
            <div>
              <i className="ri-double-quotes-r"></i>
            </div>
            <p>
              "The fitness programs here are tailored to help you reach your goals. 
              Whether you're into strength training, CrossFit, or general fitness, 
              this gym in Indore has it all! I’ve seen amazing results."
            </p>
            <h4>Michael Wong</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.client__card}>
            <img src={client3} alt="Gym member sharing experience at best fitness center in Indore" />
            <div>
              <i className="ri-double-quotes-r"></i>
            </div>
            <p>
              "I’ve tried many fitness centers, but nothing compares to <strong>House of Gains</strong>. 
              From premium equipment to professional trainers, this is hands down the best gym in Indore!"
            </p>
            <h4>Emily Davis</h4>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Clients;
