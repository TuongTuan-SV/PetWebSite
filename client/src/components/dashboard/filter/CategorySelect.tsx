import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  getAdminProducts,
  setAdminCategory,
  setEditcategory,
  setNewCategory,
} from '../../../redux/slices/productSlice';

export default function CategorySelect() {
  const { Categories } = useAppSelector((state) => state.Categories);
  const { adminsearch } = useAppSelector((state) => state.Products);
  const options = Categories.map((category: any) => {
    return { value: category.Name, label: category.Name };
  });
  // const [category, setCategory] = useState<any>(Props.category);
  // useEffect(() => {
  //   setCategory(Props.category);
  //   console.log(category);
  // }, [Props]);

  const dispatch = useAppDispatch();
  const changeHandler = (e: any) => {
    const value = e.map((item: any) => {
      return item.value;
    });
    // console.log(value);
    dispatch(
      setAdminCategory(
        value.map((item: any) => {
          console.log(`Category[all]=${item}`);
          return `Category[all]=${item}`;
        })
      )
    );
  };

  return (
    //When editing an product
    <Select
      name="part_id"
      className="basic-multi-select"
      classNamePrefix="productselect"
      isMulti
      value={options.filter((item: any) =>
        adminsearch.category?.includes(`Category[all]=${item.value}`)
      )}
      onChange={changeHandler}
      options={options}
    />
  );
}
