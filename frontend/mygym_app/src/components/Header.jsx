import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import styles from "../styles/Header.module.css";
import { Link, useLocation } from "react-router-dom";

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

    document.addEventListener('mousedown', handleClickOutsideOrScroll);
    document.addEventListener('scroll', handleClickOutsideOrScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOrScroll);
      document.removeEventListener('scroll', handleClickOutsideOrScroll);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__bar}>
        <div className={styles.nav__header}>
          <div className={styles.nav__logo}>
            <Link to="/">
              <img className={styles.logo} src={logo} alt="logo" />
            </Link>
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
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="#about">ABOUT</Link>
          </li>
          <li>
            <Link to="#">CLIENT</Link>
          </li>
          <li>
            <Link to="#c">CONTACT US</Link>
          </li>
          <li>
            <Link to="/login-register">LOGIN</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
