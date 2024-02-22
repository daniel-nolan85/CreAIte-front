import Info from '../components/Info';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Info />
      <Newsletter />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Landing;
