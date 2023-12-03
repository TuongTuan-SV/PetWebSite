import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import Upload from '../../../upload/Upload';
import {
  UploadBlogImg,
  UploadImg,
  clearBloglimg,
  clearimg,
} from '../../../../redux/slices/uploadSilce';
import {
  clearNewBlog,
  createBlog,
  setNewBlog,
} from '../../../../redux/slices/blogSlice';
import './createBlog.css';
import UploadBlog from '../../../upload/UploadBlog';
const initialState = {
  Name: '',
  Description: '',
  Short_Description: '',
  Price: 0,
  Stocks: 0,
  Brand: '',
  Category: [],
  images: [],
  reviews: [],
  Discount: 0,
};

export default function CreateBlog() {
  const { User } = useAppSelector((state) => state.User);
  const { NewBlog } = useAppSelector((state) => state.Blog);
  const { blog } = useAppSelector((state) => state.Upload);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState<
    { title: string; description: string }[]
  >([
    {
      title: '',
      description: '',
    },
  ]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setNewBlog({ ...NewBlog, Poster: User.FirstName }));
    }, 1000);
  }, [User]);
  const addSection = () => {
    setSection((prevEmployees) => [
      ...prevEmployees,
      { title: '', description: '' },
    ]);
  };

  const removeSection = () => {
    setSection(section.slice(-1));
  };

  const handleCreateBlog = async (e: any) => {
    e.preventDefault();
    blog.url
      ? dispatch(UploadBlogImg()).then(() => {
          dispatch(createBlog()).then(() => {
            dispatch(clearBloglimg());
            dispatch(clearNewBlog());
            setSection([
              {
                title: '',
                description: '',
              },
            ]);
            alert('Blog Created');
          });
        })
      : alert('No image');
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    name === 'Title'
      ? containsSpecialChars(value)
        ? alert('Title can not containt ?&#/%<>')
        : dispatch(setNewBlog({ ...NewBlog, [name]: value }))
      : dispatch(setNewBlog({ ...NewBlog, [name]: value }));
  };

  const containsSpecialChars = (str: any) => {
    const specialChars = '?&#/%<>';

    const result = specialChars.split('').some((specialChar: any) => {
      if (str.includes(specialChar)) {
        
        return true;
      }

      return false;
    });

    return result;
  };
  const handleChangeSectionInput = (index: any) => (e: any) => {
    const newArray = section.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    setSection(newArray);
    dispatch(setNewBlog({ ...NewBlog, Description: section }));
  };
  return (
    <div className="create_Blog">
      <div className="upload">
        <UploadBlog />
      </div>
      <div className="create_Blog_input">
        <form>
          <div className="row checkout-file">
            <label htmlFor="BlogName">Title</label>
            <input
              type="text"
              name="Title"
              id="Blog_id"
              required
              value={NewBlog.Title}
              onChange={handleChangeInput}
            ></input>
          </div>
          {section.map((item: any, index: any) => {
            return (
              <div key={index} style={{ textAlign: 'left' }}>
                <span>Section {index + 1}</span>
                <div className="row checkout-file">
                  <label htmlFor="BlogName">Title</label>
                  <input
                    type="text"
                    name="title"
                    id="Blog_id"
                    required
                    value={item.title}
                    onChange={handleChangeSectionInput(index)}
                  ></input>
                </div>
                <div className="row checkout-file">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    required
                    value={item.description}
                    rows={3}
                    onChange={handleChangeSectionInput(index)}
                  ></textarea>
                </div>
              </div>
            );
          })}
        </form>
        <div className="createaBlog-btn">
          <button
            onClick={handleCreateBlog}
            //   type="submit"
            style={{ marginTop: '30px' }}
            disabled={loading}
          >
            Create
          </button>
          <button
            onClick={addSection}
            style={{ marginTop: '30px' }}
            disabled={loading}
          >
            Add new section
          </button>
          <button
            onClick={removeSection}
            style={{ marginTop: '30px' }}
            disabled={loading}
          >
            Remove section
          </button>
        </div>
      </div>
    </div>
  );
}
