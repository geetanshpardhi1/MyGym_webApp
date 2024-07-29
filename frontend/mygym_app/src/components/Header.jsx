import React, { useState } from "react";
import logo from "../assets/logo.png";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__bar}>
        <div className={styles.nav__header}>
          <div className={styles.nav__logo}>
            <a href="#">
              <img className={styles.logo} src={logo} alt="logo" />
            </a>
          </div>
          <div
            className={styles.nav__menu__btn}
            id="menu-btn"
            onClick={toggleMenu}
          >
            <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </div>
        </div>
        <ul
          className={`${styles.nav__links} ${menuOpen ? styles.open : ""}`}
          id="nav-links"
        >
          <li>
            <a href="#home">HOME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#client">CLIENT</a>
          </li>
          <li>
            <a href="#contact">CONTACT US</a>
          </li>
          <li>
            <a href="#contact">LOGIN</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
