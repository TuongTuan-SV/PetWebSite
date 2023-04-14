import { Box, Rating } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { addReview } from '../../../redux/slices/blogSlice';
import DetailBlogReview from '../review/detailBlogreview';
type Review = {
  rating: number;
  Username: string;
  userid: string;
  comment: string;
};
const initialState = {
  rating: 0,
  userid: '',
  Username: '',
  comment: '',
};
const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function Review(props: any) {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);
  const [review, setReview] = useState<Review>(initialState);
  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const id = props.blog._id;
    dispatch(addReview({ review, id })).then(() => setReview(initialState));
  };
  return (
    <div className="Review-container">
      <div className="Review">
        <DetailBlogReview blog={props.blog} />
      </div>
      <div className="Review-input">
        <h2>Write a review</h2>
        <form onSubmit={handleSubmit}>
          {/* <select
          name="rating"
          value={review.rating}
          onChange={handleChangeInput}
        >
          <option value="">Select...</option>
          <option value="1">1- Poor</option>
          <option value="2">2- Fair</option>
          <option value="3">3- Good</option>
          <option value="4">4- Very good</option>
          <option value="5">5- Excelent</option>
        </select> */}

          <div className="comment-warp">
            <h2>Comment</h2>
            <textarea
              name="comment"
              id="comment"
              required
              value={review.comment}
              rows={3}
              onChange={handleChangeInput}
            ></textarea>
          </div>
          <button className="btn btn-primary review-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
