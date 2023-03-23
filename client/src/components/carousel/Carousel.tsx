import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import './carousel.css';
interface Props {
  images: {
    src: string;
    link: string;
  }[];
}

export const Carousel: React.FC<Props> = ({ images }) => {
  const { image } = useAppSelector((state) => state.Carousel);
  // State for Active index
  const carousel = useRef<any>();
  const [count, setCount] = useState(0);

  const incrementCarousel = (delta: any) => {
    if (!carousel.current) return;

    const width = carousel.current.offsetWidth;

    if (count + delta > image.length - 1) {
      setCount(0);
      carousel.current.scrollTo(0, 0);
      return;
    } else if (count + delta < 0) {
      setCount(image.length - 1);
      // console.log(width, carousel.current.scrollLeft);
      carousel.current.scrollTo(width * image.length - 1, 0);
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
        {image?.map((img: any, idx: any) => {
          console.log(img.image[0]);
          return (
            <div
              key={`${idx}`}
              className={
                idx === count ? 'carousel-item active' : 'carousel-item'
              }
            >
              <Link to="#">
                <img src={img.image[0].url} alt="img of carousel" />
              </Link>
            </div>
          );
        })}
        <div className="carouselindicator-container">
          <ul className="carouselindicator-wrap">
            {image?.map((img: any, idx: any) => {
              return (
                <li
                  key={idx}
                  onClick={() => {
                    setCount(idx);
                  }}
                ></li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
