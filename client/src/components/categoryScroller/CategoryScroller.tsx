import React from 'react';
import './CategoryScroller.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { setCategory } from '../../redux/slices/productSlice';
export default function CategoryScroller() {
  const { Categories } = useAppSelector((state) => state.Categories);
  const dispatch = useAppDispatch();
  const handleLinkClick = (event: any, message: any) => {
    console.log('Link clicked');
    dispatch(setCategory(message));
    // 👇️ refers to the link element
  };
  // const handleImgClick = (event: any, message: any) => {
  //   console.log('Link clicked');
  //   dispatch(setCategory(message));
  //   window.location.replace = '/shop';
  //   // 👇️ refers to the link element
  // };
  return (
    <div>
      <div className="media-scroller snaps-inline">
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
