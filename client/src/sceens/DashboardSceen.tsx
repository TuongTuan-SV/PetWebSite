import React, { useEffect } from 'react';
import SideBar from '../components/dashboard/sidebar/SideBar';
import { useAppDispatch } from '../hooks';
import { getAdminProducts } from '../redux/slices/productSlice';
export default function DashboardSceen() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);
  return (
    <div>
      <SideBar />
    </div>
  );
}
