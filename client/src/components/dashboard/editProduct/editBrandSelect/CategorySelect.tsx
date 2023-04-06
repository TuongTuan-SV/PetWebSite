import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  setEditcategory,
  setNewCategory,
} from '../../../../redux/slices/productSlice';

export default function CategorySelect() {
  const { Categories } = useAppSelector((state) => state.Categories);
  const { Editproduct } = useAppSelector((state) => state.Products);
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
    console.log(value);
    dispatch(setEditcategory(value));
  };

  return (
    //When editing an product
    <Select
      name="part_id"
      className="basic-multi-select"
      classNamePrefix="select"
      isMulti
      value={options.filter((item: any) =>
        Editproduct.Category?.includes(item.value)
      )}
      onChange={changeHandler}
      options={options}
    />
  );
}
