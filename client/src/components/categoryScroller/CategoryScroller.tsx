import React, { useRef } from 'react';
import './CategoryScroller.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { setCategory } from '../../redux/slices/productSlice';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function CategoryScroller() {
  const { Categories } = useAppSelector((state) => state.Categories);
  const dispatch = useAppDispatch();
  const handleLinkClick = (event: any, message: any) => {
    dispatch(setCategory(message));
  };
  // const handleImgClick = (event: any, message: any) => {
  //   console.log('Link clicked');
  //   dispatch(setCategory(message));
  //   window.location.replace = '/shop';
  //   // 👇️ refers to the link element
  // };
  const ref = useRef<any>(null);
  const scrollLeft = (scrollOffset: any) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <div>
      <div className="scoller-btn">
        <button onClick={() => scrollLeft(-230)}>
          <ArrowBackIosIcon style={{ color: 'black', padding: '3px ' }} />
        </button>
        <button onClick={() => scrollLeft(230)}>
          <ArrowForwardIosIcon style={{ color: 'black', padding: '3px ' }} />
        </button>
      </div>

      <div className="media-scroller snaps-inline" ref={ref}>
        {Categories.map((item: any) => {
          return (
            <div className="media-element">
              <Link
                onClick={(event: any) =>
                  handleLinkClick(event, `Category[all]=${item.Name}`)
                }
                to="shop"
              >
                <div className="imgContainer">
                  <img src={item?.image[0]?.url} alt="" />
                </div>

                <p className="title">{item.Name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
