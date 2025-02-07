import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import LeadMagnetPopup from "./components/LeadMagnetPopup/LeadMagnetPopup";
import { animateScroll } from "react-scroll";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to top when navigating between routes
  useEffect(() => {
    animateScroll.scrollToTop({ duration: 300 });
  }, [location]);

  return (
    <>
      <Header />
      <Outlet />
      {showPopup && <LeadMagnetPopup onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default App;
