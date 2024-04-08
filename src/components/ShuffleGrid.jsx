import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { fetchRandomCreations } from '../requests/creation';

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState([]);
  const [squareData, setSquareData] = useState([]);

  useEffect(() => {
    getRandomImages();
  }, []);

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, [squareData]);

  const getRandomImages = async () => {
    await fetchRandomCreations().then((res) => setSquareData(res.data));
  };

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const generateSquares = () => {
    return shuffle(squareData).map((sq) => (
      <motion.div
        key={sq.id}
        layout
        transition={{ duration: 1.5, type: 'spring' }}
        className='w-full h-full'
        style={{
          backgroundImage: `url(${sq.src})`,
          backgroundSize: 'cover',
        }}
      ></motion.div>
    ));
  };

  return (
    <div className='grid grid-cols-4 grid-rows-4 h-[450px] gap-1'>
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleGrid;
