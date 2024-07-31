import React, { useEffect } from 'react';
import About from './components/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Session from './components/Session';
import Membership from './components/Membership';
import Clients from './components/Clients';
// import "./styles/styles.css"
import SignInSignUp from './components/SignInSignUp';

function App(){

  return (
    <>
      <Header />
      <SignInSignUp />
     {/* <Hero />
      <About />
      <Membership />
      <Session />
      <Clients />
      <Footer /> */}
    </>
  );
}

export default App;
