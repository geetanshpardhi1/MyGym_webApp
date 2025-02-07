import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import styles from "../styles/Header.module.css";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutsideOrScroll = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideOrScroll);
    document.addEventListener("scroll", handleClickOutsideOrScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOrScroll);
      document.removeEventListener("scroll", handleClickOutsideOrScroll);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__bar}>
        <div className={styles.nav__header}>
          <div className={styles.nav__logo}>
            <RouterLink to="/">
              <img className={styles.logo} src={logo} alt="logo" />
            </RouterLink>
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
          ref={menuRef}
        >
          <li>
            <RouterLink to="/">HOME</RouterLink>
          </li>
          <li>
            <ScrollLink to="about" smooth={true} duration={500} offset={-70} className="cursor-pointer">
              ABOUT
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="clients" smooth={true} duration={500} offset={-70} className="cursor-pointer">
              CLIENT
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="contact" smooth={true} duration={500} offset={-70} className="cursor-pointer">
              CONTACT US
            </ScrollLink>
          </li>
          <li>
            <RouterLink to="/login-register">LOGIN</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
