import React from 'react';
import './card.css';
export default function Card(props: any) {
  // console.log(props);
  return (
    <div className="Card">
      {props.icon}
      <div className="Card_body">
        <span className="Card_title">{props.title}</span>
        <span className="Card_content"> {props.content}</span>
      </div>
    </div>
  );
}
