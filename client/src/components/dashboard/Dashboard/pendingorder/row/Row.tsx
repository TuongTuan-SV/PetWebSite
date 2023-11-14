import React from 'react';
import './row.css';
export default function Row(props: any) {
  return (
    <div className="container">
      <div className="left" style={{ textAlign: 'left' }}>
        <div className="order_day">{props.order_day}</div>
        <div className="order_by">
          <span>
            by {props.order_by},{props.amount} items
          </span>
        </div>
      </div>
      <div className="">
        <span className="">
          {props.total.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      </div>
    </div>
  );
}
