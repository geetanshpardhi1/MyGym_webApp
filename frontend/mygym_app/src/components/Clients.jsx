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
      <h2 className={styles.section__header}>OUR TESTIMONIALS</h2>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        className={styles.swiper}
      >
        <SwiperSlide>
          <div className={styles.client__card}>
            <img src={client1} alt="client" />
            <div>
              <i className="ri-double-quotes-r"></i>
            </div>
            <p>
              I've been a member at FitPhysique for over a year now. The range of classes
              offered here is impressive - from high-energy cardio sessions to
              relaxing yoga classes, there's something for everyone.
            </p>
            <h4>Sarah Johnson</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.client__card}>
            <img src={client2} alt="client" />
            <div>
              <i className="ri-double-quotes-r"></i>
            </div>
            <p>
              The classes are always well-planned and engaging, and the
              instructors do an excellent job of keeping us motivated
              throughout. I'm so grateful to have found such a supportive and
              inclusive gym.
            </p>
            <h4>Michael Wong</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.client__card}>
            <img src={client3} alt="client" />
            <div>
              <i className="ri-double-quotes-r"></i>
            </div>
            <p>
              I've tried many gyms in the past, but none of them compare to
              FitPhysique. From the moment I walked through the doors, I felt
              welcomed and supported by the staff and fellow members alike.
            </p>
            <h4>Emily Davis</h4>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Clients;
