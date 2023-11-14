import React from 'react';
import { Rating } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function Row(props: any) {
  return (
    <div className="">
      <div className="Reviews-Container">
        <div className="Reviews-wrap">
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
            <span>{props.Username}</span>
            <span className="Reviews-time">
              {new Date(props.createdAt).toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: '2-digit',
                day: 'numeric',
              })}
            </span>
            <Rating
              name="half-rating-read"
              defaultValue={props.rating}
              precision={0.5}
              readOnly
            />
            <span>{props.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
