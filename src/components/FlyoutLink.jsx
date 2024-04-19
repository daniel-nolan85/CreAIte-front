import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const showFlyout = open && FlyoutContent;

  const calculatePosition = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    const isCloserToLeftEdge = containerRect.left < windowWidth / 2;

    return {
      left: isCloserToLeftEdge ? 0 : 'auto',
      right: isCloserToLeftEdge ? 'auto' : 0,
    };
  };

  const position = calculatePosition();

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative h-fit w-fit"
      ref={containerRef}
    >
      <Link to={href} className="relative">
        {children}
        <span
          style={{ transform: showFlyout ? 'scaleX(1)' : 'scaleX(0)' }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left  rounded-full bg-main transition-transform duration-300 ease-out"
        ></span>
      </Link>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{
              ...position,
              top: 'calc(100% + 10px)',
              transform: 'translateX(-50%)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bg-white"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlyoutLink;
