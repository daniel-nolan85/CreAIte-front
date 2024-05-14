import { useAnimate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { fetchRandomCreations } from '../requests/creation';

export const ImageTrail = ({ text, update }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    getRandomImages();
  }, []);

  const getRandomImages = async () => {
    await fetchRandomCreations().then((res) => {
      setImages(res.data[0].photos);
    });
  };

  return (
    <MouseImageTrail renderImageBuffer={50} rotationRange={25} images={images}>
      <section className="grid h-[400px] w-full place-content-center bg-black">
        <div className="flex flex-col items-center gap-2]">
          <h1 className="font-extrabold text-[32px] text-main">{text}</h1>
          <p className="mt-2 text-[16px] text-[#666e75]">{update}</p>
        </div>
      </section>
    </MouseImageTrail>
  );
};

export default ImageTrail;

const MouseImageTrail = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: 'spring', damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: 'linear', duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={img}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};
