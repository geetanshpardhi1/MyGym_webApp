import img1 from "../assets/gallery-1.jpg"
import img2 from "../assets/gallery-2.jpg"
import img3 from "../assets/gallery-3.jpg"
import img4 from "../assets/gallery-4.jpg"
import img5 from "../assets/gallery-5.jpg"
import img6 from "../assets/gallery-6.jpg"
import img7 from "../assets/gallery-7.jpg"
import img8 from "../assets/gallery-8.jpg"
import img9 from "../assets/gallery-9.jpg"
import logo from "../assets/logo.png"
const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="section__container footer__container">
        <div className="footer__col">
          <div className="footer__logo">
            <a href="#">
              <img className="logo" src={logo} alt="logo" />
            </a>
          </div>
          <p>
            Welcome to MY-GYM, where we believe that every journey to
            fitness is unique and empowering.
          </p>
          <ul className="footer__links">
            <li>
              <a href="#">
                <span>
                  <i className="ri-map-pin-2-fill"></i>
                </span>
                Ward No 3
                <br />
                Prem Nagar, Balaghat
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i className="ri-phone-fill"></i>
                </span>
                +91 9691282188
              </a>
            </li>
            <li>
              <a href="#">
                <span>
                  <i className="ri-mail-fill"></i>
                </span>
                info@mygym.com
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>GALLERY</h4>
          <div className="gallery__grid">
            <img src={img1} alt="gallery" />
            <img src={img2} alt="gallery" />
            <img src={img3} alt="gallery" />
            <img src={img4} alt="gallery" />
            <img src={img5} alt="gallery" />
            <img src={img6} alt="gallery" />
            <img src={img7} alt="gallery" />
            <img src={img8} alt="gallery" />
            <img src={img9 } alt="gallery" />
          </div>
        </div>
        <div className="footer__col">
          <h4>NEWSLETTER</h4>
          <p>
            Don't miss out on the latest news and offers - sign up today and
            join our thriving fitness community!
          </p>
          <form action="/">
            <input type="text" placeholder="Enter Email" />
            <button className="btn btn__primary">SEND</button>
          </form>
          <div className="footer__socials">
            <a href="#">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#">
              <i className="ri-twitter-fill"></i>
            </a>
            <a href="#">
              <i className="ri-youtube-fill"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bar">
        Copyright © 2024 Web Design Mastery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;