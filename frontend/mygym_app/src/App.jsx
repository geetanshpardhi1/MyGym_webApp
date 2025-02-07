import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import LeadMagnetPopup from './components/LeadMagnetPopup/LeadMagnetPopup';


  

function App(){
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      {showPopup && <LeadMagnetPopup onClose={() => setShowPopup(false)} />}
    </>
  );
}

export default App;
