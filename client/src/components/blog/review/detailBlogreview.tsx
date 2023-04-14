import { Rating } from '@mui/material';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import './detailBlogreview.css';

export default function DetailBlogReview(props: any) {
  const blog = props.blog;
  // console.log(blog);
  return (
    <div className="Reviews-Container">
      {blog?.reviews.map((review: any) => {
        return (
          <div className="Reviews-wrap" key={review._id}>
            <div className="Reviews-user">
              <PersonOutlineOutlinedIcon
                sx={{ fontSize: 30 }}
                style={{
                  backgroundColor: '#ddd',
                  margin: '10px',
                  height: '40px',
                  width: '40px',
                  padding: '5px',
                  borderRadius: ' 50%',
                }}
              />
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
              <span>{review.comment}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
