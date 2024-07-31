import About from "./About";
import Clients from "./Clients";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Membership from "./Membership";
import Session from "./Session";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Membership />
      <Session />
      <Clients />
      <Footer />
    </>
  );
};

export default Home;
