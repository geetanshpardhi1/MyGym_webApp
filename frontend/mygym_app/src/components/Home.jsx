import About from "./About";
import Clients from "./Clients";
import Footer from "./Footer";
import Hero from "./Hero";
import Membership from "./Membership";
import Session from "./Session";

const Home = () => {
  return (
    <>
      <Hero />
      <section id="about">
        <About />
      </section>
      <section id="membership">
        <Membership />
      </section>
      <section id="session">
        <Session />
      </section>
      <section id="clients">
        <Clients />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </>
  );
};

export default Home;
