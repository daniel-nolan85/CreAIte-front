import Navbar from '../components/Navbar';
import ShuffleGrid from '../components/ShuffleGrid';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const About = () => {
  const { token } = useSelector((state) => state.user) || {};

  return (
    <>
      <Navbar />
      <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
        <div>
          <span className="block mb-4 text-xs md:text-sm text-main font-medium">
            Let's turn your words into magic
          </span>
          <h3 className="text-4xl md:text-6xl font-semibold">
            Welcome to CreAIte
          </h3>
          <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
            At CreAIte, we're passionate about unleashing creativity through the
            power of artificial intelligence. Our mission is to empower
            individuals to express themselves freely and effortlessly by
            providing innovative tools that harness the latest advancements in
            AI technology.
          </p>
          <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
            With CreAIte, you can bring your ideas to life with ease. Whether
            you're an artist, a writer, a designer, or simply someone with a
            creative spark, our platform is designed to inspire and facilitate
            your creative process. By combining cutting-edge AI algorithms with
            intuitive user interfaces, we aim to make creativity accessible to
            everyone.
          </p>
          <button className="bg-main hover:bg-mainDark w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
            {token ? (
              <Link to="/creaite">Get Started</Link>
            ) : (
              <Link to={'/login'} state={{ to: '/creaite' }}>
                Get Started
              </Link>
            )}
          </button>
        </div>
        <ShuffleGrid />
      </section>
    </>
  );
};

export default About;
