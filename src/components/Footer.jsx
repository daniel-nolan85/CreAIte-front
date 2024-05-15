import { Link } from 'react-router-dom';
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from 'react-icons/fa';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Footer = () => {
  return (
    <div className="bg-[#000300]">
      <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
        <div>
          <h1 className="w-full text-3xl font-bold text-main">CreAIte</h1>
          <p className="py-4">
            CreAIte is a product of{' '}
            <a
              href="https://www.nolancode.com/"
              className="font-bold text-main"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nolancode
            </a>
            , delivering innovative solutions to empower your business.
          </p>
          <div className="flex justify-between lg:w-[75%] my-6">
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-between mt-6">
          <div>
            <h6 className="font-medium text-gray-400">Support</h6>
            <ul>
              <li className="py-2 text-sm">
                <AnchorLink href="#info">Info</AnchorLink>
              </li>
              <li className="py-2 text-sm">
                <AnchorLink href="#newsletter">Newsletter</AnchorLink>
              </li>
              <li className="py-2 text-sm">
                <AnchorLink href="#pricing">Pricing</AnchorLink>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-gray-400">Company</h6>
            <ul>
              <Link to="/showcase">
                <li className="py-2 text-sm">Showcase</li>
              </Link>
              <Link to="/about">
                <li className="py-2 text-sm">About</li>
              </Link>
              <Link to="/contact">
                <li className="py-2 text-sm">Contact</li>
              </Link>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-gray-400">Legal</h6>
            <ul>
              <Link to="/terms" onClick={() => window.scrollTo(0, 0)}>
                <li className="py-2 text-sm">Terms</li>
              </Link>
              <Link to="/privacy" onClick={() => window.scrollTo(0, 0)}>
                <li className="py-2 text-sm">Privacy</li>
              </Link>
              <Link to="/cookies" onClick={() => window.scrollTo(0, 0)}>
                <li className="py-2 text-sm">Cookies</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
