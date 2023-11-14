import React, { useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import {
  getalluser,
  setsearch,
  setrole,
  setsort,
} from '../../../../redux/slices/userSlice';

export default function Filter() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.User);

  const handleRole = (e: any) => {
    dispatch(setrole(e.target.value));
    dispatch(getalluser());
  };

  const handleSort = (e: any) => {
    dispatch(setsort(e.target.value));
    dispatch(getalluser());
  };
  const handleSearch = (e: any) => {
    dispatch(setsearch(e.target.value));
    dispatch(getalluser());
  };
  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="category" value={search.role} onChange={handleRole}>
          <option value="">Role</option>
          <option value="0">0</option>
          <option value="1">1</option>
        </select>
      </div>

      <input
        type="text"
        value={search.search}
        placeholder="Enter Uesr Name!"
        onChange={handleSearch}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select value={search.sort} onChange={handleSort}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}
