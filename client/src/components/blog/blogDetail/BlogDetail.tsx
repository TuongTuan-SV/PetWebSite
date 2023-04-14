import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import './BlogDetail.css';
import Review from './Review';
export default function BlogDetail() {
  const { Blog } = useAppSelector((state) => state.Blog);
  const [detailBlog, setDetailBlog] = useState<any>();
  const parmas = useParams();
  useEffect(() => {
    if (parmas.id) {
      Blog.forEach((item: any) => {
        if (parmas.id === item._id) setDetailBlog(item);
      });
    }
  }, [parmas]);
  console.log(detailBlog);
  return (
    <>
      {detailBlog ? (
        <div className="detailblog_container">
          <div>
            <div className="detailblogtitle">{detailBlog.Title}</div>
            <div className="detailblog">
              <span>
                <PermIdentityOutlinedIcon className="icon" />
                <span style={{ color: '#ddd' }}>By</span> {detailBlog.Poster}
              </span>
              <span>
                <CalendarMonthOutlinedIcon
                  className="icon"
                  style={{ marginRight: '5px' }}
                />
                {new Date(detailBlog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="banner">
            <img src={detailBlog.image.url} alt=""></img>
          </div>

          {detailBlog.Description.map((item: any) => {
            return (
              <div className="section">
                <div className="title">{item.title}</div>
                <pre className="description">{item.description}</pre>
              </div>
            );
          })}
          <div className="review">
            <Review blog={detailBlog}></Review>
          </div>
        </div>
      ) : null}
    </>
  );
}
