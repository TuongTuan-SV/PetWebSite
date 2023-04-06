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
  const { carousels } = useAppSelector((state) => state.Carousel);
  // State for Active index
  const carousel = useRef<any>();
  const [count, setCount] = useState(0);

  const incrementCarousel = (delta: any) => {
    if (!carousel.current) return;

    const width = carousel.current.offsetWidth;

    if (count + delta > carousels.length - 1) {
      setCount(0);
      carousel.current.scrollTo(0, 0);
      return;
    } else if (count + delta < 0) {
      setCount(carousels.length - 1);
      // console.log(width, carousel.current.scrollLeft);
      carousel.current.scrollTo(width * carousels.length - 1, 0);
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
        {carousels?.map((carousel: any, idx: any) => {
          console.log(carousel.image[0]);
          return (
            <div
              key={`${idx}`}
              className={
                idx === count ? 'carousel-item active' : 'carousel-item'
              }
            >
              <div className="carousel-left">
                <span className="special">{carousel.special}</span>
                <h1 className="title">{carousel.title}</h1>
                <span className="content">{carousel.content}</span>
                <button className="toShop">
                  <Link to="shop">Shop Now</Link>
                </button>
              </div>
              <div className="carousel-right">
                <Link to="#">
                  <img src={carousel.image[0].url} alt="img of carousel" />
                </Link>
              </div>
            </div>
          );
        })}
        {/* <div className="carouselindicator-container">
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
        </div> */}
      </div>
    </div>
  );
};
