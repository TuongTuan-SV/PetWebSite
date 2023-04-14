import React from 'react';
import { useAppSelector } from '../../../hooks';
import { Link } from 'react-router-dom';

import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

import './BlogCard.css';
export default function BlogCard(Props: any) {
  const { Blog } = useAppSelector((state) => state.Blog);
  const blog = Props.blog;
  return (
    <div className="blog_card">
      <div className="blog_card_imgContainer">
        <Link to={`/blog/${blog._id}`}>
          <img src={blog.image?.url} alt="" />
        </Link>
        <div className="author_postday">
          <span>
            <PermIdentityOutlinedIcon className="icon" />
            <span style={{ color: '#ddd' }}>By</span> {blog.Poster}
          </span>
          <span>
            <CalendarMonthOutlinedIcon
              className="icon"
              style={{ marginRight: '5px' }}
            />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="blog_box">
          <span className="Blog_Title">{blog.Title}</span>
          <Link to={`/detail/${blog._id}`}>
            <span title={blog.Name} className="blog_item_Name">
              {blog.Name}
            </span>
          </Link>{' '}
        </div>

        {/* <div>
          <Link id="btn_buy" to="#!" onClick={() => addtocart(blog)}>
            Buy
          </Link>
        </div> */}
      </div>

      {/* <div className="row_btn">
        <Link id="btn_buy" to="#!" onClick={() => addtocart(blog)}>
          Buy
        </Link>
        <Link id="btn_view" to={`/detail/${blog._id}`}>
          View
        </Link>
      </div> */}
    </div>
  );
}
