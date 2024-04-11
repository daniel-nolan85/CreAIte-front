import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Navbar from '../components/Navbar';
import ImageTrail from '../components/ImageTrail';

const Privacy = () => {
  return (
    <>
      <Navbar />
      <ImageTrail text='Privacy Policy' update='Last updated: April 10, 2024' />
      <section className='max-w-7xl mx-auto p-4'>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          We are Nolancode (
          <span className='font-bold'>'Company', 'we, 'us',</span> or{' '}
          <span className='font-bold'>'our'</span>).
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          This Privacy Notice outlines how and why we collect, store, use, and
          share your information when you use our services (
          <span className='font-bold'>'Services'</span>).
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          Reading this privacy notice will help you understand your privacy
          rights and choices. If you do not agree with our policies and
          practices, please do not use our Services.
        </p>

        <h1 className='mt-2 font-extrabold text-[26px]'>
          Summary of Key Points
        </h1>
        <h1 className='mt-2 font-extrabold italic text-[16px]'>
          This summary provides key points from our Privacy Notice. For detailed
          information, follow the links provided or refer to the{' '}
          <AnchorLink href='#contents' className='text-main'>
            table of contents
          </AnchorLink>{' '}
          below.
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4'>
          <span className='font-extrabold text-black'>
            What personal information do we process?
          </span>{' '}
          When you visit, use, or navigate our Services, we may process personal
          information depending on how you interact with us and the Services,
          the choices you make, and the features you use. Learn more about{' '}
          <AnchorLink href='#section1' className='font-bold text-main'>
            personal information you disclose to us
          </AnchorLink>
          .
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4'>
          <span className='font-extrabold text-black'>
            How do we process your information?
          </span>{' '}
          We process your information to provide, improve, and administer our
          Services, communicate with you, for security and fraud prevention, and
          to comply with law. We may also process your information for other
          purposes with your consent. We process your information only when we
          have a valid legal reason to do so. Learn more about{' '}
          <AnchorLink href='#section2' className='font-bold text-main'>
            how we process your information
          </AnchorLink>
          .
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4'>
          <span className='font-extrabold text-black'>
            In what situations and with which parties do we share personal
            information?
          </span>{' '}
          We may share information in specific situations and with specific
          third parties. Learn more about{' '}
          <AnchorLink href='#section3' className='font-bold text-main'>
            when and with whom we share your personal information
          </AnchorLink>
          .
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4'>
          <span className='font-extrabold text-black'>
            What are your rights?
          </span>{' '}
          Depending on where you are located geographically, the applicable
          privacy law may mean you have certain rights regarding your personal
          information. Learn more about{' '}
          <AnchorLink href='#section7' className='font-bold text-main'>
            your privacy rights
          </AnchorLink>
          .
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4'>
          <span className='font-extrabold text-black'>
            How do you exercise your rights?
          </span>{' '}
          The easiest way to exercise your rights is by contacting us. We will
          consider and act upon any request in accordance with applicable data
          protection laws.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          Want to learn more about what we do with any information we collect?{' '}
          <AnchorLink href='#section1' className='font-bold text-main'>
            Read the privacy notice in full
          </AnchorLink>
          .
        </p>

        <h1 id='contents' className='font-extrabold text-[26px]'>
          Table of Contents
        </h1>
        <ol className='list-decimal list-inside ml-4 mb-8 text-main font-bold uppercase'>
          <li>
            <AnchorLink href='#section1'>
              What Information do we Collect?
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section2'>
              How do we Process Your Information?
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section3'>
              When and With Who do we Share Your Personal Information?
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section4'>
              Do we Use Cookies and Other Tracking Technologies?
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section5'>
              Is Your Information Transferred Internationally?
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section6'>
              How Long do we Keep Your Information?
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section7'>
              What are Your Privacy Rights?
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section8'>
              Controls for Do-Not-Track Features
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section9'>
              Do we Make Updates to This Notice?
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section10'>
              How can you Contact us About This Notice?
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section11'>
              How can you review, Update, or Delete the Data we Collect From
              you?
            </AnchorLink>
          </li>
        </ol>

        <h1 id='section1' className='mt-2 font-extrabold text-[26px]'>
          1. What Information Do we Collect?
        </h1>
        <h1 className='mt-2 font-extrabold text-[16px]'>
          Personal information you disclose to us
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4 italic'>
          <span className='font-extrabold text-black'>In Short:</span> We
          collect personal information that you provide to us.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4'>
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>
          Information automatically collected
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4 italic'>
          <span className='font-extrabold text-black'>In Short:</span> Some
          information - such as your Internet Protocol (IP) address and/or
          browser and device characteristics - is collected automatically when
          you visit our Services.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px]'>
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          Like many businesses, we also collect information through cookies and
          similar technologies.
        </p>

        <h1 id='section2' className='mt-2 font-extrabold text-[26px]'>
          2. How Do we Process Your Information?
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4 italic'>
          <span className='font-extrabold text-black'>In Short:</span> We
          process your information to provide, improve, and administer our
          Services, communicate with you, for security and fraud prevention, and
          to comply with law. We may also process your information for other
          purposes with your consent.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4'>
          We process your information for a variety of reasons, depending on how
          you interact with our Services, including:
        </p>
        <ul className='list-disc list-inside ml-4 text-[#666e75] mb-8'>
          <li>
            <span className='font-bold'>
              Service Provision and Improvement.
            </span>{' '}
            we process your information to ensure the effective provision of our
            Services. This includes tailoring the user experience, enhancing
            functionality, and optimizing performance based on user interactions
            and feedback
          </li>
          <li>
            <span className='font-bold'>Communication with You.</span>{' '}
            Processing informationenables us to communicate with you
            effectively. This includes responding to inquiries, providing
            updates on Services, and addressing any concerns or issues you may
            encounter during your engagement with us.
          </li>
          <li>
            <span className='font-bold'>Security and Fraud Prevention.</span>{' '}
            Your information is processed as part of our security measures to
            safeguard our Services and prevent fraudulent activities. This
            involves monitoring user interactions, detecting unusual patterns,
            and taking necessary actions to maintain a secure environment for
            all users.
          </li>
          <li>
            <span className='font-bold'>
              Compliance with Legal Requirements.
            </span>{' '}
            We process your information to comply with applicable laws and
            regulations. This includes, but is not limited to, legal obligations
            related to data protection, privacy, and any other relevant
            legislation governing the use of our Services.
          </li>
          <li>
            <span className='font-bold'>
              Additional Purposes with Your Consent.
            </span>{' '}
            In certain instances, we may seek your consent to process your
            information for purposes beyond those explicitly mentioned. This
            could include participation in surveys, promotions, or other
            activities where your consent is integral to the processing of
            specific data.
          </li>
        </ul>

        <h1 id='section3' className='mt-2 font-extrabold text-[26px]'>
          3. When and With Who Do We Share Your Personal Information?
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4 italic'>
          <span className='font-extrabold text-black'>In Short:</span> We may
          share information in specific situations described in this section
          and/or with the following third parties.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4'>
          We may need to share your personal information in the following
          situations:
        </p>
        <ul className='list-disc list-inside ml-4 text-[#666e75] mb-8'>
          <li>
            <span className='font-bold'>Business Transfers.</span> We may share
            or transfer your information in connection with, or during
            negotiations of, any merger, sale of company assets, financing, or
            acquisition of all or a portion of our business to another company.
          </li>
          <li>
            <span className='font-bold'>Affiliates.</span> We may share your
            information with our affiliates, in which case we will require those
            affiliates to honor this privacy notice. Affiliates include any
            subsidiaries, joint venture partners, or other companies that we
            control or that are under common control with us.
          </li>
          <li>
            <span className='font-bold'>Business Partners.</span> We may share
            your information with our business partners to offer you certain
            products, services, or promotions.
          </li>
        </ul>

        <h1 id='section4' className='mt-2 font-extrabold text-[26px]'>
          4. Do we Use Cookies and Other Tracking Tecnologies?
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4 italic'>
          <span className='font-extrabold text-black'>In Short:</span> We may
          use cookies and other tracking technologies to collect and store your
          information.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to access or store information. Specific information about
          how we use such technologies and how you can refuse certain cookies is
          set out in our{' '}
          <Link to='/cookies'>
            <span className='font-bold text-main'>Cookie Policy</span>
          </Link>
        </p>

        <h1 id='section5' className='mt-2 font-extrabold text-[26px]'>
          5. Is Your Information Transferred Internationally?
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4 italic'>
          <span className='font-extrabold text-black'>In Short:</span> We may
          transfer, store, and process your information in countries other than
          your own.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px]'>
          Our servers are located in the United States (US). If you are
          accessing our Services from outside the US, please be aware that your
          information may be transferred to, stored, and processed by us in our
          facilities and by those third parties with whom we share your personal
          information (see{' '}
          <AnchorLink
            href='#section3'
            className='text-main font-bold uppercase'
          >
            When and With Who Do We Share Your Personal Information?
          </AnchorLink>{' '}
          above), in the US and other countries.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          If you are a resident in the European Economic Area (EEA), United
          Kingdom (UK), or Switzerland, then these countries may not necessarily
          have data protection laws or other similar laws as comprehensive as
          those in your country. However, we will take all necessary measures to
          protect your personal information in accordance with this privacy
          notice and applicable law.
        </p>

        <h1 id='section6' className='mt-2 font-extrabold text-[26px]'>
          6. How Long Do we Keep Your Information?
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4 italic'>
          <span className='font-extrabold text-black'>In Short:</span> We keep
          your information for as long as necessary to fulfill the purposes
          outlined in this privacy notice unless otherwise required by law.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px]'>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required by law (such as tax, accounting,
          or other legal requirements).
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>

        <h1 id='section7' className='mt-2 font-extrabold text-[26px]'>
          7. What are Your Privacy Rights?
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4 italic'>
          <span className='font-extrabold text-black'>In Short:</span> You may
          review, change, or terminate your account at any time.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px]'>
          <span className='font-bold'>Withdrawing your consent:</span> If we are
          relying on your consent to process your personal information, which
          may be express and/or implied consent depending on the applicable law,
          you have the right to withdraw your consent at any time. You can
          withdraw your consent at any time by contacting us by using the
          contact details provided in the section{' '}
          <AnchorLink
            href='#section10'
            className='text-main font-bold uppercase'
          >
            How Can you Contact us About This Notice?
          </AnchorLink>{' '}
          below.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4'>
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal nor, when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>Account information</h1>
        <p className='mt-4 text-[#666e75] text-[16px]'>
          If you would at any time like to review or change the information in
          your account or terminate your account, you can.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          Upon your request to terminate your account, we will deactivate or
          delete your account and information from our active databases.
          However, we may retain some information in our files to prevent fraud,
          troubleshoot problems, assist with any investigations, enforce our
          legal terms and/or comply with applicable legal requirements.
        </p>

        <h1 id='section8' className='mt-2 font-extrabold text-[26px]'>
          8. Controls for Do-Not-Track Features.
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          Some mobile operating systems and mobile applications include a
          Do-Not-Track (“DNT”) feature or setting you can activate to signal
          your privacy preference not to have data about your online browsing
          activities monitored and collected. At this stage no uniform
          technology standard for recognizing and implementing DNT signals has
          been finalized. As such, we do not currently respond to DNT browser
          signals or any other mechanism that automatically communicates your
          choice not to be tracked online. If a standard for online tracking is
          adopted that we must follow in the future, we will inform you about
          that practice in a revised version of this privacy notice.
        </p>

        <h1 id='section9' className='mt-2 font-extrabold text-[26px]'>
          9. Do we Make Updates to this Notice?
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4 italic'>
          <span className='font-extrabold text-black'>In Short:</span> Yes, we
          will update this notice as necessary to stay compliant with relevant
          laws.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated “Revised” date and the updated
          version will be effective as soon as it is accessible. If we make
          material changes to this privacy notice, we may notify you either by
          prominently posting a notice of such changes or by directly sending
          you a notification. We encourage you to review this privacy notice
          frequently to be informed of how we are protecting your information.
        </p>

        <h1 id='section10' className='mt-2 font-extrabold text-[26px]'>
          10. How can you Contact us About this Notice?
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          If you have questions or comments about this notice, you may contact
          us by email at{' '}
          <span className='font-bold text-main'>info@nolancode.com</span> or by
          completing the{' '}
          <Link to='/contact'>
            <span className='font-bold text-main'>Contact Form</span>
          </Link>
          .
        </p>

        <h1 id='section11' className='mt-2 font-extrabold text-[26px]'>
          11. How can you Review, Update, or Delete the Data we Collect from
          you?
        </h1>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          change the information, or delete it. To request to review, update, or
          delete your personal information, please contact us.
        </p>
      </section>
    </>
  );
};

export default Privacy;
