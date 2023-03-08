import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './carousel.css';
interface Props {
  images: {
    src: string;
    link: string;
  }[];
}

export const Carousel: React.FC<Props> = ({ images }) => {
  // State for Active index
  const carousel = useRef<any>();
  const [count, setCount] = useState(0);

  const incrementCarousel = (delta: any) => {
    if (!carousel.current) return;

    const width = carousel.current.offsetWidth;

    if (count + delta > images.length - 1) {
      setCount(0);
      carousel.current.scrollTo(0, 0);
      return;
    } else if (count + delta < 0) {
      setCount(images.length - 1);
      // console.log(width, carousel.current.scrollLeft);
      carousel.current.scrollTo(width * images.length - 1, 0);
      return;
    }

    carousel.current.scrollTo(carousel.current.scrollLeft + width * delta, 0);
    setCount((c) => c + delta);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-btn left-btn"
        onClick={() => incrementCarousel(-1)}
      />
      <div
        className="carousel-btn right-btn"
        onClick={() => incrementCarousel(1)}
      />
      <div className="carousel" ref={carousel}>
        {images.map((img, idx) => {
          // console.log(img);
          return (
            <div
              key={`${idx}`}
              className={
                idx === count ? 'carousel-item active' : 'carousel-item'
              }
            >
              <Link to={`/detail/${img.link}`}>
                <img src={img.src} alt="img of carousel" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
