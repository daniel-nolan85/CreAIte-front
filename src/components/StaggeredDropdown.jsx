import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { motion } from 'framer-motion';

const StaggeredDropdown = ({
  header,
  option,
  setOption,
  dalleVersion,
  options,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <motion.div animate={open ? 'open' : 'closed'} className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-8 py-2 rounded-md text-black bg-main hover:bg-mainDark mb-4 lg:mb-0 w-full lg:w-auto"
        >
          <span className="font-medium text-sm">{option}</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: 'top', translateX: '-50%' }}
          className="z-50 flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          <p className="pl-4 text-sm font-medium text-gray-900">{header}</p>
          {dalleVersion ? (
            <>
              <Option
                setOpen={setOpen}
                setOption={setOption}
                text={dalleVersion === 'Dall-E-2' ? '256x256' : '1024x1024'}
              />
              <Option
                setOpen={setOpen}
                setOption={setOption}
                text={dalleVersion === 'Dall-E-2' ? '512x512' : '1792x1024'}
              />
              <Option
                setOpen={setOpen}
                setOption={setOption}
                text={dalleVersion === 'Dall-E-2' ? '1024x1024' : '1024x1792'}
              />
            </>
          ) : options === 'dalle' ? (
            <>
              <Option setOpen={setOpen} setOption={setOption} text="Dall-E-2" />
              <Option setOpen={setOpen} setOption={setOption} text="Dall-E-3" />
            </>
          ) : options === 'gpt' ? (
            <>
              <Option setOpen={setOpen} setOption={setOption} text="GPT-3.5" />
              <Option
                setOpen={setOpen}
                setOption={setOption}
                text="GPT-4 Turbo"
              />
            </>
          ) : (
            options === 'support' && (
              <>
                <Option
                  setOpen={setOpen}
                  setOption={setOption}
                  text="Standard"
                />
                <Option
                  setOpen={setOpen}
                  setOption={setOption}
                  text="Priority"
                />
              </>
            )
          )}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({ text, setOpen, setOption }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOption(text);
        setOpen(false);
      }}
      className="flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap rounded-md hover:bg-main text-black hover:text-black cursor-pointer"
    >
      <motion.span variants={actionIconVariants}></motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropdown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
