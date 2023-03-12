import { Rating } from '@mui/material';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import './productRating.css';

export default function ProductRating(props: any) {
  const product = props.product;
  // console.log(product);
  return (
    <div className="Reviews-Container">
      {product.reviews.map((review: any) => {
        return (
          <div className="Reviews-wrap" key={review._id}>
            <div className="Reviews-user">
              <PersonOutlineOutlinedIcon sx={{ fontSize: 30 }} />
            </div>

            <div className="Reviews-content">
              <span>{review.Username}</span>
              <span className="Reviews-time">
                {new Date(review.createdAt).toLocaleString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: '2-digit',
                  day: 'numeric',
                })}
              </span>
              <Rating
                name="half-rating-read"
                defaultValue={review.rating}
                precision={0.5}
                readOnly
              />
              <span>{review.comment}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
