import { useEffect, useState } from 'react';
import { MdDashboard, MdOutlineMessage, MdLogout } from 'react-icons/md';
import { SiSimpleanalytics } from 'react-icons/si';
import { LiaToolsSolid } from 'react-icons/lia';
import { IoSettingsSharp } from 'react-icons/io5';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const variants = {
  expanded: { width: '20%' },
  nonExpanded: { width: '5%' },
};

const navItems = [
  {
    name: 'Dashboard',
    icon: MdDashboard,
  },
  {
    name: 'Analytics',
    icon: SiSimpleanalytics,
  },
  {
    name: 'Message',
    icon: MdOutlineMessage,
  },
  {
    name: 'Tools',
    icon: LiaToolsSolid,
  },
  {
    name: 'Settings',
    icon: IoSettingsSharp,
  },
];

const Sidebar = () => {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.section
      animate={isExpanded ? 'expanded' : 'nonExpanded'}
      variants={variants}
      className='w-1/5 bg-[#000300] h-screen flex flex-col items-center relative px-6'
    >
      <div className='flex flex-col justify-center items-center gap-8'>
        <div
          id='navlinks-box'
          className='flex flex-col justify-center items-start gap-5 w-full '
        >
          {navItems.map((item, index) => (
            <div
              key={item.name}
              id='link-box'
              className={
                'flex justify-start items-center gap-4 w-full cursor-pointer rounded-xl ' +
                (activeNavIndex === index
                  ? 'bg-main text-black '
                  : 'text-white ') +
                (isExpanded ? 'px-6 py-2' : 'p-2')
              }
              onClick={() => setActiveNavIndex(index)}
            >
              <div className='bg-main text-black p-2 rounded-full'>
                <item.icon className='md:w-6 w-4 h-4 md:h-6' />
              </div>
              <span className={'text-lg ' + (isExpanded ? 'flex' : 'hidden')}>
                {item?.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        id='expanded-icon'
        className='bg-main text-black p-2 rounded-full cursor-pointer absolute -right-4 bottom-20 md:bottom-40 md:flex hidden'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <FaArrowLeft /> : <FaArrowRight />}
      </div>
    </motion.section>
  );
};

export default Sidebar;
