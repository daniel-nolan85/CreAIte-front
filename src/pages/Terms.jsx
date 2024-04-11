import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Navbar from '../components/Navbar';
import ImageTrail from '../components/ImageTrail';

const Terms = () => {
  return (
    <>
      <Navbar />
      <ImageTrail
        text='Terms & Conditions'
        update='Last updated: April 10, 2024'
      />
      <section className='max-w-7xl mx-auto p-4'>
        <h1 className='mt-2 font-extrabold text-[26px]'>
          Agreement to our Legal Terms
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          We are Nolancode (
          <span className='font-bold'>'Company', 'we, 'us',</span> or{' '}
          <span className='font-bold'>'our'</span>).
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          we operate the application CreAIte (the{' '}
          <span className='font-bold'>'App'</span>), as well as any other
          related products and services that refer or link to these legal terms
          (the <span className='font-bold'>'Legal Terms'</span>) (collectively,
          the <span className='font-bold'>'Services'</span>)
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          You can contact us by email at{' '}
          <span className='font-bold text-main'>info@nolancode.com</span> or by
          completing the{' '}
          <Link to='/contact'>
            <span className='font-bold text-main'>Contact Form</span>
          </Link>
          .
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          The Legal terms constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity (
          <span className='font-bold'>'you'</span>), and Nolancode, concerning
          your access to and use of the Services. You agree that by accessing
          the Services, you have read, understood, and agreed to be bound by all
          of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL
          TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND
          YOU MUST DISCONTINUE USE IMMEDIATELY.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          Supplemental terms and conditions or documents that may be posted on
          the Services from time to time are hereby expressly incorporated
          herein by reference. We reserve the right, in our sole discretion, to
          make changes or modifications to these Legal Terms from time to time.
          We will alert you about any changes by updating the 'Last updated'
          date of these Legal Terms, and you waive any right to receive specific
          notice of each such change. It is your responsibility to periodically
          review these Legal Terms to stay informed of updates. You will be
          subject to and will be deemed to have been made aware of and to have
          accepted, the changes in any revised Legal Terms by your continued use
          of the Services after the date such revised Legal Terms are posted.
        </p>
        <p className='mt-2 mb-8 text-[#666e75] text-[16px]'>
          All users who are minors in the jurisdiction in which they reside
          (generally under the age of 18) must have the permission of their
          parent or guardian to use the Services. If you are a minor, you must
          have your parent or guardian read and agree to these Legal Terms prior
          to you using the Services.
        </p>
        <h1 className='font-extrabold text-[26px]'>Table of Contents</h1>
        <ol className='list-decimal list-inside ml-4 mb-8 text-main font-bold cursor-pointer uppercase'>
          <li>
            <AnchorLink href='#section1'>Our services</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section2'>
              Intellectual Property Rights
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section3'>User Representations</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section4'>User Registration</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section5'>Purchases and Payment</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section6'>Subscriptions</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section7'>Prohibited Activities</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section8'>
              User Generated Contributions
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section9'>Contribution Licence</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section10'>
              Mobile Application Licence
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section11'>Social Media</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section12'>Services Management</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section13'>Privacy Policy</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section14'>Term and Termination</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section15'>
              Modifications and Interruptions
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section16'>Governing Law</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section17'>Dispute Resolution</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section18'>Corrections</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section19'>Disclaimer</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section20'>Limitations of Liability</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section21'>Indemnification</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section22'>User Data</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section23'>
              Electronic Communications, Transactions, and Signatures
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section24'>
              California Users and residents
            </AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section25'>Miscellaneous</AnchorLink>
          </li>
          <li>
            <AnchorLink href='#section26'>Contact Us</AnchorLink>
          </li>
        </ol>
        <h1 id='section1' className='mt-2 font-extrabold text-[26px]'>
          1. Our Services
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          The information provided when using the Services is not intended for
          distribution to or use by any person or entity in any jurisdiction or
          country where such distribution or use would be contrary to law or
          regulation or which would subject us to any registration requirement
          within such jurisdiction or country. Accordingly, those persons who
          choose to access the Services from other locations do so on their own
          initiative and are solely responsible for compliance with local laws,
          if and to the extent local laws are applicable.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          The Services are not tailored to comply with industry-specific
          regulations (Health Insurance Portability and Accountability Act
          (HIPAA), Federal Information Security Management Act (FISMA), etc.),
          so if your interactions would be subjected to such laws, you may not
          use the Services. You may not use the Services in a way that would
          violate the Gramm-Leach-Bliley Act (GLBA).
        </p>
        <h1 id='section2' className='mt-2 font-extrabold text-[26px]'>
          2. Intellectual Property Rights
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          We are the owner or the licensee of all intellectual property rights
          in our Services, including all source code, databases, functionality,
          software, website designs, audio, video, text, photographs, and
          graphics in the Services (collectively, the{' '}
          <span className='font-bold'>'Content'</span>), as well as the
          trademarks, service marks, and logos contained therein (the{' '}
          <span className='font-bold'>'Marks'</span>).
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          Our Content and Marks are protected by copyright and trademark laws
          (and various other intellectual property rights and unfair competition
          laws) and treaties in the United States and around the world.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          The Content and Marks are provided in or through the Services 'AS IS'
          for your personal, non-commercial use or internal business purpose
          only.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>
          Your use of our services
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          Subject to your compliance with these Legal Terms, including the{' '}
          <AnchorLink
            href='#section7'
            className='text-main font-bold cursor-pointer uppercase'
          >
            Prohibited Activities
          </AnchorLink>{' '}
          section below, we grant you a non-exclusive, non-transferable,
          revocable licence to:
        </p>
        <ul className='list-disc list-inside ml-4 text-[#666e75]'>
          <li>access the Services; and</li>
          <li>
            copy any portion of the Content to which you have properly gained
            access.
          </li>
        </ul>
        <p className='mt-4 text-[#666e75] text-[16px]'>
          solely for your personal, non-commercial use or internal business
          purpose.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          Except as set out in this section or elsewhere in our Legal Terms, no
          part of the Services and no Content or Marks may be copied,
          reproduced, aggregated, republished, uploaded, posted, publicly
          displayed, encoded, translated, transmitted, distributed, sold,
          licensed, or otherwise exploited for any commercial purpose
          whatsoever, without our express prior written permission.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          If you wish to make any use of the Services, Content, or Marks other
          than that set out in this section or elsewhere in our Legal Terms,
          please address your request to:{' '}
          <span className='font-bold text-main'>info@nolancode.com</span>. If we
          ever grant you the permission to post, reproduce, or publicly display
          any part of our Services or Content, you must identify us as the
          owners or licensors of the Services, Content, or Marks and ensure that
          any copyright or proprietary notice appears or is visible on posting,
          reproducing, or displaying our Content.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          We reserve all rights not expressly granted to you in and to the
          Services, Content, and Marks.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          Any breach of these Intellectual Property Rights will constitute a
          material breach of our Legal Terms and your right to use our Services
          will terminate immediately.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>
          Your submissions and contributions
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          Please review this section and the{' '}
          <AnchorLink
            href='#section7'
            className='text-main font-bold cursor-pointer uppercase'
          >
            Prohibited Activities
          </AnchorLink>{' '}
          section carefully prior to using our Services to understand the (a)
          rights you give us and (b) obligations you have when you post or
          upload any content through the Services.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          <span className='font-extrabold text-black'>Submissions:</span> By
          directly sending us any question, comment, suggestion, idea, feedback,
          or other information about the Services (
          <span className='font-bold'>'Submissions'</span>), you agree to assign
          to us all intellectual property rights in such Submission. You agree
          that we shall own this Submission and be entitled to its unrestricted
          use and dissemination for any lawful purpose, commercial or otherwise,
          without acknowledgement or compensation to you.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          <span className='font-extrabold text-black'>Contributions:</span> The
          Services may invite you to chat, contribute to, or participate in
          blogs, message boards, online forums, and other functionality during
          which you may create, submit, post, display, transmit, publish,
          distribute, or broadcast content and materials to us through our
          Services, including but not limited to text, writings, video, audio,
          photographs, music, graphics, comments, reviews, rating suggestions,
          personal information, or other material (
          <span className='font-bold'>'Contributions'</span>
          ). Any Submission that is publicly posted shall also be treated as a
          Contribution.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          You understand that Contributions may be viewable by other users of
          the Services.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          <span className='font-extrabold text-black'>
            When you post Contributions, you grant us a licence (including use
            of your name, trademarks, and logos):
          </span>{' '}
          By posting any Contributions, you grant us an unrestricted, unlimited,
          irrevocable, perpetual, non-exclusive, transferable, royalty-free,
          fully-paid, worldwide right, and licence to: use, copy, reproduce,
          distribute, sell, resell, publish, broadcast, retitle, store, publicly
          perform, publicly display, reformat, translate, excerpt (in whole or
          in part), and exploit your Contributions (including, without
          limitation, your image, name, and voice) for any purpose, commercial,
          advertising, or otherwise, to prepare derivative works of, or
          incorporate into other works, your Contributions, and to sublicence
          the licences granted in this section. Our use and distribution may
          occur in any media formats and through any media channels.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          This licence includes our use of your name, company name, and
          franchise name, as applicable, and any of the trademarks, service
          marks, trade names, logos, and personal and commercial images you
          provide.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          <span className='font-extrabold text-black'>
            You are responsible for what you post or upload:
          </span>{' '}
          By sending us Submissions and/or posting Contributions through any
          part of the Services or making Contributions accessible through the
          Services by linking your account through the Services to any of your
          social networking accounts, you:
        </p>
        <ul className='list-disc list-inside ml-4 text-[#666e75]'>
          <li>
            confirm that you have read and agree with our{' '}
            <AnchorLink
              href='#section7'
              className='text-main font-bold cursor-pointer uppercase'
            >
              Prohibited Activities
            </AnchorLink>{' '}
            and will not post, send, publish, upload, or transmit through the
            Services any Submission nor post any Contribution that is illegal,
            harassing, hateful, harmful, defamatory, obscene, bullying, abusive,
            discriminatory, threatening to any person or group, sexually
            explicit, false, inaccurate, deceitful, or misleading;
          </li>
          <li>
            to the extent permissible by applicable law, waive any and all moral
            rights to any such Submission and/or Contribution;
          </li>
          <li>
            warrant that any such Submission and/or Contributions are original
            to you or that you have the necessary rights and licences to submit
            such Submissions and/or Contributions and that you have full
            authority to grant us the above-mentioned rights in relation to your
            Submissions and/or Contributions; and
          </li>
          <li>
            warrant and represent that your Submissions and/or Contributions do
            not constitute confidential information.
          </li>
        </ul>
        <p className='mt-4 text-[#666e75] text-[16px]'>
          You are solely responsible for your Submissions and/or Contributions
          and you expressly agree to reimburse us for any and all losses that we
          may suffer because of your breach of (a) this section, (b) any third
          party's intellectual property rights, or (c) applicable law.
        </p>
        <p className='mt-4 text-[#666e75] text-[16px] mb-4'>
          <span className='font-extrabold text-black'>
            We may remove or edit your Content:
          </span>{' '}
          Although we have no obligation to monitor any Contributions, we shall
          have the right to remove or edit any Contributions at any time without
          notice if in our reasonable opinion we consider such Contributions
          harmful or in breach of these Legal Terms. If we remove or edit any
          such Contributions, we may also suspend or disable your account and
          report you to the authorities.
        </p>

        <h1 id='section3' className='mt-2 font-extrabold text-[26px]'>
          3. User Representations
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          By using the Services, you represent and warrant that: (1) all
          registration information you submit will be true, accurate, current,
          and complete; (2) you will maintain the accuracy of such information
          and promptly update such registration information as necessary; (3)
          you have the legal capacity and you agree to comply with these Legal
          Terms; (4) you are not a minor in the jurisdiction in which you
          reside, or if you are a minor, you have received parental permission
          to use the Services; (5) you will not access the Services through
          automated or non-human means, whether through a bot, script or
          otherwise; (6) you will not use the Services for any illegal or
          unauthorized purpose; and (7) your use of the Services will not
          violate any applicable law or regulation.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          If you provide any information that is untrue, inaccurate, not
          current, or incomplete, we have the right to suspend or terminate your
          account and refuse any and all current or future use of the Services
          (or any portion thereof).
        </p>

        <h1 id='section4' className='mt-2 font-extrabold text-[26px]'>
          4. User Registration
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          You may be required to register to use the Services. You agree to keep
          your password confidential and will be responsible for all use of your
          account and password. We reserve the right to remove, reclaim, or
          change a username you select if we determine, in our sole discretion,
          that such username is inappropriate, obscene, or otherwise
          objectionable.
        </p>

        <h1 id='section5' className='mt-2 font-extrabold text-[26px]'>
          5. Purchases and Payment
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          We accept the following forms of payment:
        </p>
        <ul className='list-disc list-inside ml-4 text-[#666e75]'>
          <li>Visa</li>
          <li>Mastercard</li>
          <li>American Express</li>
          <li>Discover</li>
        </ul>
        <p className='mt-4 text-[#666e75] text-[16px]'>
          You agree to provide current, complete, and accurate purchase and
          account information for all purchases made via the Services. You
          further agree to promptly update account and payment information,
          including email address, payment method, and payment card expiration
          date, so that we can complete your transactions and contact you as
          needed. Sales tax will be added to the price of purchases as deemed
          required by us. We may change prices at any time. All payments shall
          be in US dollars.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          You agree to pay all charges at the prices then in effect for your
          purchases and any applicable processing fees, and you authorize us to
          charge your chosen payment provider for any such amounts upon placing
          your order. We reserve the right to correct any errors or mistakes in
          pricing, even if we have already requested or received payment.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          We reserve the right to refuse any order placed through the Services.
          We may, in our sole discretion, limit or cancel quantities purchased
          per person, per household, or per order. These restrictions may
          include orders placed by or under the same customer account, the same
          payment method, and/or orders that use the same billing address. We
          reserve the right to limit or prohibit orders that, in our sole
          judgement, appear to be placed by dealers, resellers, or distributors.
        </p>

        <h1 id='section6' className='mt-2 font-extrabold text-[26px]'>
          6. Subscriptions
        </h1>
        <h1 className='mt-2 font-extrabold text-[16px]'>Billing and Renewal</h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          Your Subscription will continue and automatically renew unless
          cancelled. Your consent to our charging your payment method on a
          recurring basis without requiring your prior approval for each
          recurring charge, until such time as you cancel the applicable order.
          The length of your billing cycle is monthly.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>Free Trial</h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          We hereby extend an offer of a complimentary trial duration comprising
          the generation of up to five images to newly registered users engaging
          with our Services. On the free plan, users are entitled to produce up
          to five CreAItions at no charge. Subsequent to the exhaustion of this
          allocation, users shall be precluded from generating additional
          CreAItions until such time as they opt to transition to a paid
          subscription.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>Cancellation</h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          All purchases are non-refundable. Users may cancel their subscriptions
          by logging into their accounts, navigating to the Subscription section
          within the Billing Settings, and subsequently selecting the option to
          cancel situated beneath their subscription details. Your cancellation
          will take effect at the end of the current paid term. If you have any
          questions or are unsatisfied with our Services, please email us at{' '}
          <span className='font-bold text-main'>info@nolancode.com</span>.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>Fee Changes</h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          We may, from time to time, make changes to the subscription fee and
          will communicate any price changes to you in accordance with
          applicable law.
        </p>

        <h1 id='section7' className='mt-2 font-extrabold text-[26px]'>
          7. Prohibited Activities
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          You may not access or use the Services for any purpose other than that
          for which we make the Services available. The Services may not be used
          in connection with any commercial endeavours except those that are
          specifically endorsed or approved by us.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          As a user of the Services, you agree not to:
        </p>
        <ul className='list-disc list-inside ml-4 text-[#666e75] mb-8'>
          <li>
            Systematically retrieve data or other content from the Services to
            create or compile, directly or indirectly, a collection,
            compilation, database, or directory without written permission from
            us.
          </li>
          <li>
            Trick, defraud, or mislead us and other users, especially in any
            attempt to learn sensitive account information such as user
            passwords.
          </li>
          <li>
            Circumvent, disable, or otherwise interfere with security-related
            features of the Services, including features that prevent or
            restrict the use or copying of any Content or enforce limitations on
            the use of the Services and/or the Content contained therein.
          </li>
          <li>
            Disparage, tarnish, or otherwise harm, in our opinion, us and/or the
            Services.
          </li>
          <li>
            Use any information obtained from the Services in order to harass,
            abuse, or harm another person.
          </li>
          <li>
            Make improper use of our support services or submit false reports of
            abuse or misconduct.
          </li>
          <li>
            Use the Services in a manner inconsistent with any applicable laws
            or regulations.
          </li>
          <li>Engage in unauthorized framing of or linking to the Services.</li>
          <li>
            Upload or transmit (or attempt to upload or to transmit) viruses,
            Trojan horses, or other material, including excessive use of capital
            letters and spamming (continuous posting of repetitive text), that
            interferes with any party's uninterrupted use and enjoyment of the
            Services or modifies, impairs, disrupts, alters, or interferes with
            the use, features, functions, operation, or maintenance of the
            Services.
          </li>
          <li>
            Engage in any automated use of the system, such as using scripts to
            send comments or messages, or using any data mining, robots, or
            similar data gathering and extraction tools.
          </li>
          <li>
            Delete the copyright or other proprietary rights notice from any
            Content.
          </li>
          <li>Attempt to impersonate another user or person.</li>
          <li>
            Upload or transmit, (or attempt to upload or to transmit) any
            material that acts as a passive or active information collection or
            transmission mechanism, including without limitation, clear graphics
            interchange formats ('gifs'), 1x1 pixels, web bugs, cookies, or
            other similar devices (sometimes referred to as 'spyware' or
            'passive collection mechanisms' or 'pcms').
          </li>
          <li>
            Interfere with, disrupt, or create an undue burden on the Services
            or the networks or services connected to the Services.
          </li>
          <li>
            Harass, annoy, intimidate, or threaten any of our employees or
            agents engaged in providing any portion of the Services to you.
          </li>
          <li>
            Attempt to bypass any measures of the Services designed to prevent
            or restrict access to the Services, or any portion of the Services.
          </li>
          <li>
            Copy or adapt the Services' software, including but not limited to
            Flash, PHP, HTML, JavaScript, or other code.
          </li>
          <li>
            Except as permitted by applicable law, decipher, decompile,
            disassemble, or reverse engineer any of the software comprising or
            in any way making up a part of the Services.
          </li>
          <li>
            Except as may be the result of standard search engine, or Internet
            browser usage, use, launch, develop, or distribute any automated
            system, including without limitation, any spider, robot, cheat
            utility, scraper, or offline reader that accesses the Services, or
            use or launch any unauthorized script or other software.
          </li>
          <li>
            Make any unauthorized use of the Services, including collecting
            usernames and/or email addresses of users by electronic or other
            means for the purpose of sending unsolicited email, or creating user
            accounts by automated means or under false pretences.
          </li>
          <li>
            Use the Services as part of any effort to compete with us or
            otherwise use the Services and/or the Content for any
            revenue-generating endeavour or commercial enterprise.
          </li>
          <li>
            Use the Services to advertise or offer to sell goods and services.
          </li>
          <li>Sell or otherwise transfer your profile.</li>
        </ul>

        <h1 id='section8' className='mt-2 font-extrabold text-[26px]'>
          8. User Generated Contributions
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          The Services may invite you to chat, contribute to, or participate in
          blogs, message boards, online forums, and other functionality, and may
          provide you with the opportunity to create, submit, post, display,
          transmit, perform, publish, distribute, or broadcast content and
          materials to us or on the Services, including but not limited to text,
          writings, video, audio, photographs, graphics, comments, suggestions,
          or personal information or other material (collectively,{' '}
          <span className='font-bold'>'Contributions'</span>). Contributions may
          be viewable by other users of the Services and through third-party
          websites. As such, any Contributions you transmit may be treated as
          non-confidential and non-proprietary. When you create or make
          available any Contributions, you thereby represent and warrant that:
        </p>
        <ul className='list-disc list-inside ml-4 text-[#666e75] mb-8'>
          <li>
            The creation, distribution, transmission, public display, or
            performance, and the accessing, downloading, or copying of your
            Contributions do not and will not infringe the proprietary rights,
            including but not limited to the copyright, patent, trademark, trade
            secret, or moral rights of any third party.
          </li>
          <li>
            You are the creator and owner of or have the necessary licences,
            rights, consents, releases, and permissions to use and to authorize
            us, the Services, and other users of the Services to use your
            Contributions in any manner contemplated by the Services and these
            Legal Terms.
          </li>
          <li>
            You have the written consent, release, and/or permission of each and
            every identifiable individual person in your Contributions to use
            the name or likeness of each and every such identifiable individual
            person to enable inclusion and use of your Contributions in any
            manner contemplated by the Services and these Legal Terms.
          </li>
          <li>Your Contributions are not false, inaccurate, or misleading.</li>
          <li>
            Your Contributions are not unsolicited or unauthorized advertising,
            promotional materials, pyramid schemes, chain letters, spam, mass
            mailings, or other forms of solicitation.
          </li>
          <li>
            Your contributions are not obscene, lewd, lascivious, filthy,
            violent, harassing, libelous, slanderous, or otherwise objectionable
            (as determined by us).
          </li>
          <li>
            Your Contributions do not ridicule, mock, disparage, intimidate, or
            abuse anyone.
          </li>
          <li>
            Your Contributions are not used to harass or threaten (in the legal
            sense of those terms) any other person and to promote violence
            against a specific person or class of people.
          </li>
          <li>
            Your Contributions do not violate any applicable law, regulation, or
            rule.
          </li>
          <li>
            Your Contributions do not violate the privacy or publicity rights of
            any third party.
          </li>
          <li>
            Your Contributions do not violate any applicable law concerning
            child pornography, or otherwise intended to protect the health or
            well-being of minors.
          </li>
          <li>
            Your Contributions do not include any offensive comments that are
            connected to race, national origin, gender, sexual preference, or
            physical handicap.
          </li>
          <li>
            Your Contributions do not otherwise violate, or link to material
            that violates, any provision of these Legal Terms, or any applicable
            law or regulation.
          </li>
        </ul>
        <p className='mt-4 text-[#666e75] text-[16px] mb-8'>
          Any use of the Services in violation of the foregoing violates these
          Legal Terms and may result in, among other things, termination or
          suspension of your rights to use the Services.
        </p>

        <h1 id='section9' className='mt-2 font-extrabold text-[26px]'>
          9. Contribution Licence
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          By posting your Contributions to any part of the Services, you
          automatically grant, and you represent and warrant that you have the
          right to grant, to us an unrestricted, unlimited, irrevocable,
          perpetual, non-exclusive, transferable, royalty-free, fully-paid,
          worldwide right, and licence to host, use, copy, reproduce, disclose,
          sell, resell, publish, broadcast, retitle, archive, store, cache,
          publicly perform, publicly display, reformat, translate, transmit,
          excerpt (in whole or in part), and distribute such Contributions
          (including, without limitation, your image and voice) for any purpose,
          commercial, advertising, or otherwise, and to prepare derivative works
          of, or incorporate into other works, such Contributions, and grant and
          authorize sublicences of the foregoing. The use and distribution may
          occur in any media formats and through any media channels.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          This licence will apply to any form, media, or technology now known or
          hereafter developed, and includes our use of your name, company name,
          and franchise name, as applicable, and any of the trademarks, service
          marks, trade names, logos, and personal and commercial images you
          provide. You waive all moral rights in your Contributions, and you
          warrant that moral rights have not otherwise been asserted in your
          Contributions.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          We do not assert any ownership over your Contributions. You retain
          full ownership of all your Contributions and any intellectual property
          rights or other proprietary rights associated with your Contributions.
          We are not liable for any statements or representations in your
          Contributions provided by you in any area on the Services. You are
          solely responsible for your Contributions to the Services and you
          expressly agree to exonerate us from any and all responsibility and to
          refrain from any legal action against us regarding your Contributions.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          We have the right, in our sole and absolute discretion, (1) to edit,
          redact, or otherwise change any Contributions; (2) to re-categorise
          any Contributions to place them in more appropriate locations on the
          Services; and (3) to pre-screen or delete any Contributions at any
          time and for any reason, without notice. We have no obligation to
          monitor your Contributions.
        </p>

        <h1 id='section10' className='mt-2 font-extrabold text-[26px]'>
          10. Mobile Application Licence
        </h1>
        <h1 className='mt-2 font-extrabold text-[16px]'>Use Licence</h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          If you access the Services via the App, then we grant you a revocable,
          non-exclusive, non-transferable, limited right to install and use the
          App on wireless electronic devices owned or controlled by you, and to
          access and use the App on such devices strictly in accordance with the
          terms and conditions of this mobile application licence contained in
          these Legal terms. You shall not: (1) except as permitted by
          applicable law, decompile, reverse engineer, disassemble, attempt to
          derive the source code of, or decrypt the App; (2) make any
          modification, adaptation, improvement, enhancement, translation, or
          derivative work from the App; (3) violate any applicable laws, rules,
          or regulations in connection with your accessor use of the App; (4)
          remove, alter, or obscure any proprietary notice (including any notice
          of copyright or trademark) posted by us or the licensors of the App;
          (5) use the App for any revenue-generating endeavour, commercial
          enterprise, or other purpose for which it is not designed or intended;
          (6) make the App available over a network or other environment
          permitting access or use by multiple devices or users at the same
          time; (7) use the App for creating a product, service, or software
          that is, directly or indirectly, competitive with or in any way a
          substitute for the App; (8) use the App to send automated queries to
          any website or to send any unsolicited commercial email; or (9) use
          any proprietary information or any of our interfaces or our other
          intellectual property in the design, development, manufacture,
          licensing, or distribution of any applications, accessories, or
          devices for use with the App.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>
          Apple and Android Devices
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          The following terms apply when you use the App obtained from either
          the Apple Store or Google Play (each an{' '}
          <span className='font-bold'>'App Distributor'</span>) to access the
          Services: (1) the licence granted to you for our App is limited to a
          non-transferable licence to use the application on a device that
          utilizes the Apple iOS or Android operating systems, as applicable,
          and in accordance with the usage rules set forth in the applicable App
          Distributor's terms of service; (2) we are responsible for providing
          any maintenance and support services with respect to the App as
          specified in the terms and conditions of this mobile application
          licence contained in these Legal Terms or as otherwise required under
          applicable law, and you acknowledge that each App Distributor has no
          obligation whatsoever to furnish any maintenance and support services
          with respect to the App; (3) in the event of any failure of the App to
          conform to any applicable warranty, you may notify the applicable App
          Distributor, and the App Distributor, in accordance with its terms and
          policies, may refund the purchase price, if any, paid for the App, and
          to the maximum extent permitted by applicable law, the App Distributor
          will have no other warranty obligation whatsoever with respect to the
          App; (4) you represent and warrant that (i) you are not located in a
          country that is subject to a US government embargo, or that has been
          designated by the US government as a 'terrorist supporting' country
          and (ii) you are not listed on any US government list of prohibited or
          restricted parties; (5) you must comply with the applicable
          third-party terms of agreement when using the App, e.g. if you have a
          VoIP application, then you must not be in violation of their wireless
          data service agreement when using the App; and (6) you acknowledge and
          agree that the App Distributors are third-party beneficiaries of the
          terms and conditions in this mobile application licence contained in
          these Legal Terms, and that each App Distributor will have the right
          (and will be deemed to have accepted the right) to enforce the terms
          and conditions in this mobile application licence contained in these
          Legal Terms against you as a third-party beneficiary thereof.
        </p>

        <h1 id='section11' className='mt-2 font-extrabold text-[26px]'>
          11. Social Media
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          As part of the functionality of the Services, you may link your
          account with online accounts you have with third-party service
          providers (each such account, a{' '}
          <span className='font-bold'>'Third-Party Account'</span>) by either:
          (1) providing your Third-Party Account login information through the
          Services; or (2) allowing us to access your Third-Party Account, as is
          permitted under the applicable terms and conditions that govern your
          use of each Third-Party Account. You represent and warrant that you
          are entitled to disclose your Third-Party Account login information to
          us and/or grant us access to your Third-Party Account, without breach
          by you of any of the terms and conditions that govern your use of the
          applicable Third-Party Account, and without obligating us to pay any
          fees or making us subject to any usage limitations imposed by the
          third-party service provider of the Third-Party Account. By granting
          us access to any Third-Party Accounts, you understand that (1) we may
          access, make available, and store (if applicable) any content that you
          have provided to and stored in your Third-Party Account (the{' '}
          <span className='font-bold'>'Social Network Content'</span>) so that
          it is available on and through the Services via your account,
          including without limitation any friend lists and (2) we may submit to
          and receive from your Third-Party Account additional information to
          the extent you are notified when you link your account with the
          Third-Party Account. Depending on the Third-Party Accounts you choose
          and subject to the privacy settings that you have set in such
          Third-Party Accounts, personally identifiable information that you
          post to your Third-Party Accounts may be available on and through your
          account on the Services. Please note that if a Third-Party Account or
          associated service becomes unavailable or our access to such
          Third-Party Account is terminated by the third-party service provider,
          then Social Network Content may no longer be available on and through
          the Services. You will have the ability to disable the connection
          between your account on the Services and your Third-Party Accounts at
          any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY
          SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS
          GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY SERVICE
          PROVIDERS. We make no effort to review any Social Network Content for
          any purpose, including but not limited to, for accuracy, legality, or
          non-infringement, and we are not responsible for any Social Network
          Content. You acknowledge and agree that we may access your email
          address book associated with a Third-Party Account and your contacts
          list stored on your mobile device or tablet computer solely for
          purposes of identifying and informing you of those contacts who have
          also registered to use the Services. You can deactivate the connection
          between the Services and your Third-Party Account by contacting us
          using the contact information below or through your account settings
          (if applicable). We will attempt to delete any information stored on
          our servers that was obtained through such Third-Party Account, except
          the username and profile picture that became associated with your
          account.
        </p>

        <h1 id='section12' className='mt-2 font-extrabold text-[26px]'>
          12. Services Management
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          We reserve the right, but not the obligation, to: (1) monitor the
          Services for violations of these Legal Terms; (2) take appropriate
          legal action against anyone who, in our sole discretion, violates the
          law or these Legal Terms, including without limitation, reporting such
          user to law enforcement authorities; (3) in our sole discretion and
          without limitation, refuse, restrict access to, limit the availability
          of, or disable (to the extent technologically feasible) any of your
          Contributions or any portion thereof; (4) in our sole discretion and
          without limitation, notice, or liability, to remove from the Services
          or otherwise disable all files and content that are excessive in size
          or are in any way burdensome to our systems; and (5) otherwise mange
          the Services in a manner designed to protect our rights and property
          and to facilitate the proper functioning of the Services.
        </p>

        <h1 id='section13' className='mt-2 font-extrabold text-[26px]'>
          13. Privacy Policy
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          We care about data privacy and security. By using the Services, you
          agree to be bound by our Privacy Policy posted on the Services, which
          is incorporated into these Legal Terms. Please be advised the Services
          are hosted in the United States. If you access the Services from any
          other region of the world with laws or other requirements governing
          personal data collection, use, or disclosure that differ from
          applicable laws in the United States, then through your continued use
          of the Services, you are transferring your data to the United States,
          and you expressly consent to have your data transferred to and
          processed in the United States.
        </p>

        <h1 id='section14' className='mt-2 font-extrabold text-[26px]'>
          14. Term and Termination
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          These Legal Terms shall remain in full force and effect while you use
          the Services. Without limiting any other provision of these Legal
          Terms, we reserve the right to, in our sole discretion and without
          notice or liability, deny access to and use of the Services (including
          blocking certain IP addresses), to any person for any reason or for no
          reason, including without limitation for breach of any representation,
          warranty, or covenant contained in these Legal Terms or of any
          applicable law or regulation. We may terminate your use or
          participation in the Services or delete your account and any content
          or information that you posted at any time, without warning, in our
          sole discretion.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          If we terminate or suspend your account for any reason, you are
          prohibited from registering and creating a new account under your
          name, a fake or borrowed name, or the name of any third party, even if
          you may be acting on behalf of the third party. In addition to
          terminating or suspending your account, we reserve the right to take
          appropriate legal action, including without limitation pursuing civil,
          criminal, and injunctive redress.
        </p>

        <h1 id='section15' className='mt-2 font-extrabold text-[26px]'>
          15. Modifications and Interruptions
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          We reserve the right to change, modify, or remove the contents of the
          Services at any time or for any reason at our sole discretion without
          notice. However, we have no obligation to update any information on
          our Services. We will not be liable to you or any third party for any
          modification, price change, suspension, or discontinuance of the
          Services.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          We cannot guarantee the Services will be available at all times. We
          may experience hardware, software, or other problems or need to
          perform maintenance related to the Services, resulting in
          interruptions, delays, or errors. We reserve the right to change,
          revise, update, suspend, discontinue, or otherwise modify the Services
          at any time or for any reason without notice to you. You agree that we
          have no liability whatsoever for any loss, damage, or inconvenience
          caused by your inability to access or use the Services during any
          downtime or discontinuance of the Services. Nothing in these Legal
          terms will be construed to obligate us to maintain and support the
          Services or to supply any corrections, updates, or releases in
          connection therewith.
        </p>

        <h1 id='section16' className='mt-2 font-extrabold text-[26px]'>
          16. Governing Law
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          These Legal Terms and your use of the Services are governed by and
          construed in accordance with the laws of the State of Nevada
          applicable to agreements made and to be entirely performed within the
          State of Nevada, without regard to its conflict of law principles.
        </p>

        <h1 id='section17' className='mt-2 font-extrabold text-[26px]'>
          17. Dispute Resolution
        </h1>
        <h1 className='mt-2 font-extrabold text-[16px]'>
          Informal Negotiations
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          To expedite resolution and control the cost of any dispute,
          controversy, or claim related to these Legal Terms (each a{' '}
          <span className='font-bold'>'Dispute'</span>
          and collectively, the <span className='font-bold'>'Disputes'</span>)
          brought by either you or us (individually, a{' '}
          <span className='font-bold'>'Party'</span> and collectively, the{' '}
          <span className='font-bold'>'Parties'</span>), the Parties agree to
          first attempt to negotiate any Dispute (except those Disputes
          expressly provided below) informally for at least 28 days before
          initiating arbitration. Such informal negotiations commence upon
          written notice from one Party to the other Party.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>Binding Arbitration</h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          If the Parties are unable to resolve a Dispute through informal
          negotiations, the Dispute (except those Disputes expressly excluded
          below) will be finally and exclusively resolved by binding
          arbitration. You understand that without this provision, you would
          have the right to sue in court and have a jury trial. The arbitration
          shall be commenced and conducted under the Commercial Arbitration
          Rules of the American Arbitration Association ('AAA') and, where
          appropriate, the AAA's Supplementary Procedures for Consumer related
          Disputes ('AAA Consumer Rules'), both of which are available at the{' '}
          <a
            href='https://www.adr.org/'
            className='font-bold text-main'
            target='_blank'
            rel='noopener noreferrer'
          >
            American Arbitration Association (AAA) website
          </a>
          . Your arbitration fees and your share of arbitrator compensation
          shall be governed by the AAA Consumer Rules and, where appropriate,
          limited by the AAA Consumer Rules. The arbitration may be conducted in
          person, through the submission of documents, by phone, or online. The
          arbitrator will make a decision in writing, but need not provide a
          statement of reasons unless requested by either Party. The arbitrator
          must follow applicable law, and any award may be challenged if the
          arbitrator fails to do so. Except as otherwise provided herein, the
          Parties may litigate in court to compel arbitration, stay proceedings
          pending arbitration, or to confirm, modify, vacate, or enter judgement
          on the award entered by the arbitrator.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          If for any reason, a Dispute proceeds in court rather than
          arbitration, the Dispute shall be commenced or prosecuted in the state
          and federal courts, and the Parties hereby consent to, and waive all
          defences lack of personal jurisdiction, and forum non conveniens with
          respect to venue and jurisdiction in such state and federal courts.
          Application of the United Nations Convention on Contracts for the
          international Sale of Goods and the Uniform Computer Information
          Transaction Act (UCITA) are excluded from these Legal Terms.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          If this provision is found to be illegal or unenforceable, then
          neither Party will elect to arbitrate any Dispute falling within that
          portion of this provision found to be illegal or unenforceable and
          such Dispute shall be decided by a court of competent jurisdiction,
          and the Parties agree to submit to the personal jurisdiction of that
          court.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>Restrictions</h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-4'>
          The Parties agree that any arbitration shall be limited to the Dispute
          between the Parties individually. To the full extent permitted by law,
          (a) no arbitration shall be joined with any other proceeding; (b)
          there is no right or authority for any Dispute to be arbitrated on a
          class-action basis or to utilize class action procedures; and (c)
          there is no right or authority for any Dispute to be brought in a
          purported representative capacity on behalf of the general public or
          any other persons.
        </p>
        <h1 className='mt-2 font-extrabold text-[16px]'>
          Exceptions to Informal Negotiations and Arbitration
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          The Parties agree that the following Disputes are not subject to the
          above provisions concerning informal negotiations binding arbitration:
          (a) any Disputes seeking to enforce or protect, or concerning the
          validity of, any of the intellectual property rights of a Party; (b)
          any Dispute related to, or arising from, allegations of theft, piracy,
          invasion of privacy, or unauthorized use; and (c) any claim for
          injunctive relief. If this provision is found to be illegal or
          unenforceable, then neither Party will elect to arbitrate any Dispute
          falling within that portion of this provision found to be illegal or
          unenforceable and such Dispute shall be decided by a court of
          competent jurisdiction, and the Parties agree to submit to the
          personal jurisdiction of that court.
        </p>

        <h1 id='section18' className='mt-2 font-extrabold text-[26px]'>
          18. Corrections
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          There may be information on the Services that contains typographical
          errors, inaccuracies, or omissions, including descriptions, pricing,
          availability, and various other information. We reserve the right to
          correct any errors, inaccuracies, or omissions and to change or update
          the information on the Services at any time, without prior notice.
        </p>

        <h1 id='section19' className='mt-2 font-extrabold text-[26px]'>
          19. Disclaimer
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          The Services are provided on an as-is and as-available basis. You
          agree that your use of the Services will be at your sole risk. To the
          fullest extent permitted by law, we disclaim all warranties, express
          or implied, in connection with the Services and your use thereof,
          including, without limitation, the implied warranties or
          merchantability, fitness for a particular purpose, and
          non-infringement. We make no warranties or representations about the
          accuracy or completeness of the Services' content or the content of
          any websites or mobile applications linked to the Services and we will
          assume no liability or responsibility for any (1) errors, mistakes, or
          inaccuracies of content and materials, (2) personal injury or property
          damage, of any nature whatsoever, resulting from your access to and
          use of the Services, (3) any unauthorized access to or use of our
          secure servers and/or any and all personal information and/or
          financial information stored therein, (4) any interruption or
          cessation of transmission to or from the services, (5) any bugs,
          viruses, Trojan horses, or the like which may be transmitted to or
          through the Services by any third party, and/or (6) any errors or
          omissions in any content and materials or for any loss or damage of
          any kind incurred as a result of the use of any content posted,
          transmitted, or otherwise made available via the Services. We do not
          warrant, endorse, guarantee, or assume responsibility for any product
          or service advertised or offered by a third party through the
          Services, any hyperlinked website, or any website or mobile
          application featured in any advertisement, and we will not be a party
          to or in any way be responsible for monitoring any transaction between
          you and any third-party providers of products or services. As with the
          purchase of a product or service through any medium or in any
          environment, you should use your best judgement and exercise caution
          where appropriate.
        </p>

        <h1 id='section20' className='mt-2 font-extrabold text-[26px]'>
          20. Limitations of Liability
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          In no event will we or our directors, employees, or agents be liable
          to you or any third party for any direct, indirect, consequential,
          exemplary, incidental, special, or punitive damages, including lost
          profit, lost revenue, loss of data, or other damages arising from your
          use of the Services, even if we have been advised of the possibility
          of such damages.
        </p>

        <h1 id='section21' className='mt-2 font-extrabold text-[26px]'>
          21. Indemnification
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          You agree to defend, indemnify, and hold us harmless, including our
          subsidiaries, affiliates, and all of our respective officers, agents,
          partners, and employees, from and against any loss, damage, liability,
          claim, or demand, including reasonable attorney's fees and expenses,
          made by any third party due to or arising out of: (1) your
          Contributions; (2) use of the Services; (3) breach of these Legal
          Terms; (4) any breach of your representations and warranties set forth
          in these Legal Terms; (5) your violation of the rights of a third
          party, including but not limited to intellectual; property rights; or
          (6) any overt harmful act toward any other user of the Services with
          whom you connected via the Services. Notwithstanding the foregoing, we
          reserve the right, at your expense, to assume the exclusive defence
          and control of any matter for which you are required to indemnify us,
          and you agree to cooperate, at your expense, with our defence of such
          claims. We will use reasonable efforts to notify you of any such
          claim, action, or proceeding which is subject to this indemnification
          upon becoming aware of it.
        </p>

        <h1 id='section22' className='mt-2 font-extrabold text-[26px]'>
          22. User Data
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          We will maintain certain data that you transmit to the Services for
          the purpose of managing the performance of the Services, as well as
          data relating to your use of the Services. Although we perform regular
          routine backups of data, you are solely responsible for all data that
          you transmit or that relates to any activity you have undertaken using
          the Services. You agree that we shall have no liability to you for any
          loss or corruption for any such data, and you hereby waive any right
          of action against us arising from any such loss or corruption of such
          data.
        </p>

        <h1 id='section23' className='mt-2 font-extrabold text-[26px]'>
          23. Electronic Communications, Transactions, and Signatures
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          Visiting the Services, sending us emails, and completing online forms
          constitute electronic communications. You consent to receive
          electronic communications, and you agree that all agreements, notices,
          disclosures, and other communications we provide to you
          electronically, via email and on the Services, satisfy any legal
          requirement that such communication be in writing. You hereby agree to
          the use of electronic signatures, contracts, orders, and other
          records, and to electronic delivery of notices, policies, and records
          of transactions initiated or completed by us or via the Services. You
          hereby waive any rights or requirements under any statutes,
          regulations, rules, ordinances, or other laws in any jurisdiction
          which require an original signature or delivery or retention of
          non-electronic records, or to payments or the granting of credits by
          any means other than electronic means.
        </p>

        <h1 id='section24' className='mt-2 font-extrabold text-[26px]'>
          24. California Users and Residents
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          If any complaint with us is not satisfactorily resolved, you can
          contact the Complaint Assistance Unit of the Division of Consumer
          Services of the California Department of Consumer Affairs in writing
          at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834
          or by telephone at (800) 952-5210 or (916) 445-1254.
        </p>

        <h1 id='section25' className='mt-2 font-extrabold text-[26px]'>
          25. Miscellaneous
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          These Legal Terms and any policies or operating rules posted by us on
          the Services or in respect to the Services constitute the entire
          agreement and understanding between you and us. Our failure to
          exercise or enforce any right or provision of these Legal Terms shall
          not operate as a waiver of such right or provision. These Legal Terms
          operate to the fullest extent permissible by law. We may assign any or
          all of our rights and obligations to others at any time. We shall not
          be responsible or liable for any loss, damage, delay, or failure to
          act caused by any cause beyond our reasonable control. If any
          provision or part of a provision of these Legal Terms is determined to
          be unlawful, void, or unenforceable, that provision or part of the
          provision is deemed severable from these Legal Terms and does not
          affect the validity and enforceability of any remaining provisions.
          There is no joint venture, partnership, employment or agency
          relationship created between you and us as a result of these Legal
          Terms or use of the Services. You agree that these Legal Terms will
          not be construed against us by virtue of having drafted them. You
          hereby waive any and all defences you have based on the electronic
          form of these Legal Terms and the lack of signing by the parties
          hereto to execute these Legal Terms.
        </p>

        <h1 id='section26' className='mt-2 font-extrabold text-[26px]'>
          26. Contact Us
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] mb-8'>
          In order to resolve a complaint regarding the Services or to receive
          further information regarding use of the Services, please contact us
          by email at{' '}
          <span className='font-bold text-main'>info@nolancode.com</span> or by
          completing the{' '}
          <Link to='/contact'>
            <span className='font-bold text-main'>Contact Form</span>
          </Link>
          .
        </p>
      </section>
    </>
  );
};

export default Terms;
