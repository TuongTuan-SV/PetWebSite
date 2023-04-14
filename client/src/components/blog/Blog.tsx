import React from 'react';
import { useAppSelector } from '../../hooks';
import BlogCard from './blogcard/Blogcard';
import './blog.css';
export default function Blog() {
  const { Blog } = useAppSelector((state) => state.Blog);
  return (
    <div className="Blog_container">
      {Blog.map((item: any) => {
        return <BlogCard blog={item} />;
      })}
    </div>
  );
}
