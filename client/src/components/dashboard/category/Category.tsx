import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createCategory } from '../../../redux/slices/categorySilce';
import './category.css';
export default function Category() {
  const dispatch = useAppDispatch();
  const { Categories } = useAppSelector((state) => state.Categories);
  const [category, setCategory] = useState<any>('');
  const [onEdit, setOnedit] = useState(false);
  const [id, setId] = useState('');
  const handlecreateCategory = async (e: any) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(`/api/category/${id}`, { Name: category });
        console.log(res);
      } else {
        // const res = await axios.post(
        //   '/api/category',
        //   { name: category },
        //   {
        //     headers: { Authorization: token },
        //   }
        // );
        // console.log(res);
        dispatch(createCategory(category));
      }
      setOnedit(false);
      setCategory('');
    } catch (err: any) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id: any, name: any) => {
    setId(id);
    setCategory(name);
    setOnedit(true);
  };

  const deleteCategory = async (id: any) => {
    try {
      const res = await axios.delete(`/api/category/${id}`);
      console.log(res.data.msg);
    } catch (err: any) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="categories">
      <form onSubmit={handlecreateCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        ></input>
        <button type="submit">{onEdit ? 'Update' : 'Save'}</button>
      </form>

      <div className="col">
        {Categories.map((category: any) => (
          <div className="row" key={category._id}>
            <p>{category.Name}</p>
            <div>
              <button onClick={() => editCategory(category._id, category.Name)}>
                Edit
              </button>
              <button
                onClick={() =>
                  window.confirm('Delete')
                    ? deleteCategory(category._id)
                    : alert('notdeleted')
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
