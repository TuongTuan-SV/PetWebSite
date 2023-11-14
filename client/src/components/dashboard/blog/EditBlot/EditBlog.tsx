import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import Upload from '../../../upload/Upload';
import {
  DeleteEditBlogImg,
  EditBlogImg,
  UploadBlogImg,
  UploadImg,
  clearBloglimg,
  clearEditBlogimg,
  clearimg,
  setEditBlogimg,
} from '../../../../redux/slices/uploadSilce';
import {
  createBlog,
  setEditBlog,
  updateBlog,
} from '../../../../redux/slices/blogSlice';
import UploadBlog from '../../../upload/UploadBlog';
import { useParams } from 'react-router-dom';
import EditUploadBlog from '../../../upload/EditUploadBlog';
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

export default function EditBlog() {
  const { User } = useAppSelector((state) => state.User);
  const { EditBlog, Blog } = useAppSelector((state) => state.Blog);
  const { blog, tmpBlog } = useAppSelector((state) => state.Upload);
  const parmas = useParams();
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearEditBlogimg());
    if (parmas.id) {
      Blog.forEach((Blog: any) => {
        if (Blog._id === parmas.id) {
          dispatch(setEditBlog(Blog));
          dispatch(setEditBlogimg(Blog.image));
          setSection(Blog.Description);
        }
      });
    }
  }, [parmas, Blog]);
  const addSection = () => {
    // EditBlog.Description.push({ title: '', description: '' });
    setSection((prevEmployees) => [
      ...prevEmployees,
      { title: '', description: '' },
    ]);
  };

  const removeSection = () => {
    setSection(section.slice(-1));
  };

  const handleEditBlog = async (e: any) => {
    e.preventDefault();
    tmpBlog.url
      ? await dispatch(EditBlogImg()).then(() => {
          dispatch(updateBlog());
          dispatch(DeleteEditBlogImg());
          alert('Blog Update');
        })
      : dispatch(updateBlog()).then(() => {
          alert('Blog Update');
        });
  };

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    name === 'Title'
      ? containsSpecialChars(value)
        ? alert('Title can not containt ?&#/%<>')
        : dispatch(setEditBlog({ ...EditBlog, [name]: value }))
      : dispatch(setEditBlog({ ...EditBlog, [name]: value }));
    dispatch(setEditBlog({ ...EditBlog, [name]: value }));
  };

  const containsSpecialChars = (str: any) => {
    const specialChars = '?&#/%<>';

    const result = specialChars.split('').some((specialChar: any) => {
      if (str.includes(specialChar)) {
        console.log('ádasdsad');
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
    dispatch(setEditBlog({ ...EditBlog, Description: newArray }));
  };
  return (
    <div className="create_Blog">
      <div className="upload">
        <EditUploadBlog />
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
              value={EditBlog.Title}
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
            onClick={handleEditBlog}
            //   type="submit"
            style={{ marginTop: '30px' }}
            disabled={loading}
          >
            Update
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
