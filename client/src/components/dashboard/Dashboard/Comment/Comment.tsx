import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Row from './row/Row';
import { useAppSelector } from '../../../../hooks';

export default function Comments() {
  const { adminproduct } = useAppSelector((state) => state.Products);
  const Product: any = adminproduct
    .filter((item: any) => {
      if (item.reviews.length > 0) return item.reviews;
    })
    .map((item: any) => {
      return item.reviews[0];
    });

  //   console.log(item);
  //   // if (item?.rating === 5) return item;
  // });

  return (
    <div className="Comment" style={{ width: '100%' }}>
      <h2>Comments</h2>
      <div>
        {Product?.map((reivew: any) =>
          reivew.rating > 1 ? (
            <Row
              createdAt={new Date(reivew.createdAt).toLocaleDateString()}
              Username={reivew.Username}
              rating={reivew.rating}
              comment={reivew.comment}
              key={reivew._id}
            ></Row>
          ) : null
        )}
      </div>
    </div>
  );
}
