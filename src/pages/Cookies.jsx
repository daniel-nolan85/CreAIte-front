import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ImageTrail from '../components/ImageTrail';

const Cookies = () => {
  return (
    <>
      <Navbar />
      <ImageTrail text="Cookies Policy" update="Last updated: May 1, 2024" />
      <section className="max-w-7xl mx-auto p-4">
        <p className="mt-2 text-[#666e75] text-[16px]">
          We are Nolancode (
          <span className="font-bold">'Company', 'we, 'us',</span> or{' '}
          <span className="font-bold">'our'</span>).
        </p>
        <p className="mt-2 text-[#666e75] text-[16px] mb-8">
          This Data Storage and Retrieval Policy explains how we handle data
          storage and retrieval processes in our application CreAIte (the
          "App").
        </p>

        <h1 className="mt-2 font-extrabold text-[26px]">
          1. Data Storage Mechanisms
        </h1>
        <p className="mt-4 text-[#666e75] text-[16px] mb-4">
          <span className="font-extrabold text-black">
            Redux and Context API:
          </span>{' '}
          We utilize Redux state management and the React Context API within the
          App to store and manage application state. This includes user
          preferences, session data, and other relevant information required for
          the proper functioning of the App.
        </p>
        <p className="mt-4 text-[#666e75] text-[16px] mb-8">
          <span className="font-extrabold text-black">MongoDB:</span> Our App
          may interact with a MongoDB database for the storage and retrieval of
          user-specific data. This data is securely stored and accessed to
          enhance user experience and provide personalized features.
        </p>

        <h1 className="mt-2 font-extrabold text-[26px]">
          2. Server-Side Dependencies
        </h1>
        <h1 className="mt-2 font-extrabold text-[16px]">2.1 Firebase Admin</h1>
        <p className="mt-2 text-[#666e75] text-[16px] mb-4">
          Firebase Admin is used for server-side authentication which may
          involve the use of tokens for authentication, but does not directly
          utilize traditional cookies.
        </p>
        <h1 className="mt-2 font-extrabold text-[16px]">
          2.2 Express and Cors
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] mb-4">
          Express is used as the backend framework, and Cors (Cross-Origin
          Resource Sharing) is configured to handle cross-origin requests. While
          Express itself doesn't use cookies, Cors may involve handling cookies
          for cross-origin requests, depending on your configuration.
        </p>
        <h1 className="mt-2 font-extrabold text-[16px]">
          2.3 Express-jwt and Jsonwebtoken
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] mb-4">
          Express-jwt and Jsonwebtoken are used for handling JWT (JSON Web
          Tokens) for authentication. The use of tokens doesn't inherently
          involve cookies, but storing tokens in cookies for web-based
          authentication might be configured explicitly.
        </p>
        <h1 className="mt-2 font-extrabold text-[16px]">2.4 Cloudinary</h1>
        <p className="mt-2 text-[#666e75] text-[16px] mb-4">
          The Cloudinary package on the server side may involve interactions
          with Cloudinary APIs. Please refer to the Cloudinary documentation for
          any specific use of sessions or cookies.
        </p>
        <h1 className="mt-2 font-extrabold text-[16px]">2.5 Socket.io</h1>
        <p className="mt-2 text-[#666e75] text-[16px] mb-8">
          Socket.io is used for real-time communication. While it involves
          session handling, it typically doesn't use traditional cookies.
        </p>

        <h1 className="mt-2 font-extrabold text-[26px]">3. User Consent</h1>
        <p className="mt-4 text-[#666e75] text-[16px] mb-8">
          By using our App, you consent to the storage and retrieval of data as
          outlined in this policy. You can manage your data preferences within
          the App settings.
        </p>

        <h1 className="mt-2 font-extrabold text-[26px]">4. Data Security</h1>
        <p className="mt-4 text-[#666e75] text-[16px] mb-8">
          We take data security seriously. The data stored within the App and
          server-side components is treated with the utmost confidentiality and
          is protected using industry-standard security measures.
        </p>

        <h1 className="mt-2 font-extrabold text-[26px]">
          5. Third-Party Integrations
        </h1>
        <p className="mt-4 text-[#666e75] text-[16px] mb-8">
          If third-party services are integrated into the App or server-side
          components, they may have their own data storage and retrieval
          mechanisms. Please refer to the privacy policies of these third
          parties for more information.
        </p>

        <h1 className="mt-2 font-extrabold text-[26px]">
          6. Changes to this Policy
        </h1>
        <p className="mt-4 text-[#666e75] text-[16px] mb-8">
          We may update this Data Storage and Retrieval Policy from time to time
          to reflect changes in our practices or for other operational, legal,
          or regulatory reasons. The date of the latest revision will be
          indicated at the top of the policy.
        </p>

        <h1 className="mt-2 font-extrabold text-[26px]">7. Contact Us</h1>
        <p className="mt-4 text-[#666e75] text-[16px] mb-8">
          If you have any questions about how we handle data storage and
          retrieval in our App or this policy, please contact us by email at{' '}
          <span className="font-bold text-main">support@creaite.media</span> or
          by completing the{' '}
          <Link to="/contact">
            <span className="font-bold text-main">Contact Form</span>
          </Link>
          .
        </p>
      </section>
    </>
  );
};

export default Cookies;
