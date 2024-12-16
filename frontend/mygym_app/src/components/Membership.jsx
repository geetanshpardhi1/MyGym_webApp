import { useEffect } from "react";
import styles from "../styles/Membership.module.css";
import ScrollReveal from "scrollreveal";
import { useSelector } from "react-redux";
import axios from "axios";

const Membership = () => {
  useEffect(() => {
    const scrollRevealOptions = {
      distance: "50px",
      origin: "bottom",
      duration: 1500,
    };

    const cards = document.querySelectorAll(`.${styles.membership__card}`);

    cards.forEach((card, index) => {
      ScrollReveal().reveal(card, {
        ...scrollRevealOptions,
        delay: index * 500,
      });
    });
  }, []);

  // TESTING CODE FOR PURCHASING MEMBERSHIP
  // const accessToken = useSelector((state) => state.auth.accessToken);
  // const username = useSelector((state) => state.auth.user.username);

  // const handleBuyNow = async (membershipType) => {
  //   const payload = {
  //     username,      //username is mandatory not user email
  //     membership_type: membershipType,
  //     duration: "Monthly",
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://13.200.155.3/users/create-membership/",
  //       payload,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("Membership created:", response.data);
  //   } catch (error) {
  //     console.error("Error creating membership:", error);
  //   }
  // };

  return (
    <section className={styles.membership}>
      <div
        className={`${styles.section__container} ${styles.membership__container}`}
      >
        <h2 className={styles.section__header}>MEMBERSHIP</h2>
        <div className={styles.membership__grid}>
          <div className={styles.membership__card}>
            <h4>STANDARD</h4>
            <ul>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Gym floor access and standard equipment.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Group fitness classes: yoga, Zumba, Pilates.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Complimentary fitness consultations.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Locker room and showers.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Nutritional guidance and snacks.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Member discounts on merchandise.
              </li>
            </ul>
            <h3>
              <sup>$</sup>30<span>/month</span>
            </h3>
            <button
              className={`${styles.btn} ${styles.btn__primary}`}
              onClick={() => handleBuyNow("Base")}
            >
              BUY NOW
            </button>
          </div>
          <div className={styles.membership__card}>
            <h4>PROFESSIONAL</h4>
            <ul>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Standard Membership facilities included.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Priority booking for personal training.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Access to advanced equipment.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Complimentary fitness consultations.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Exclusive member events and workshops.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Discounts on additional services.
              </li>
            </ul>
            <h3>
              <sup>$</sup>45<span>/month</span>
            </h3>
            <button
              className={`${styles.btn} ${styles.btn__primary}`}
              onClick={() => handleBuyNow("Premium")}
            >
              BUY NOW
            </button>
          </div>
          <div className={styles.membership__card}>
            <h4>ULTIMATE</h4>
            <ul>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Standard and Professional facilities included.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Unlimited access to premium amenities.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Reserved parking or valet service.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Complimentary premium fitness classes.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Customized workout plans.
              </li>
              <li>
                <span>
                  <i className="ri-check-line"></i>
                </span>
                Priority access to guest passes and events.
              </li>
            </ul>
            <h3>
              <sup>$</sup>60<span>/month</span>
            </h3>
            <button
              className={`${styles.btn} ${styles.btn__primary}`}
              onClick={() => handleBuyNow("Gold")}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
