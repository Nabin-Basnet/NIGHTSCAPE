import React from 'react';
import { Outlet } from 'react-router-dom';
import MainContent from './Pages/AdminMain';
import AdminProducts from './Pages/AdminProduct';       // example admin page
import AdminCategory from './Pages/AdminCategory';
import AdminBrand from './Pages/AdminBrand';
// import ProductAdd from '../Pages/ProductAdd';
// import ProductEdit from '../Pages/ProductEdit';

const AdminRoutes = () => {
  return (
    <>
      <Outlet /> {/* Render nested admin routes */}
    </>
  );
};

const adminRoutesConfig = [
  {
    path: "main",
    element: <MainContent />
  },
  {
    path: "products",
    element: <AdminProducts />
  },
  {
    path: "category",
    element: <AdminCategory />
  },
   {
    path: "brand",
    element: <AdminBrand />
  },
  // 
  // {
  //   path: "products/add",
  //   element: <ProductAdd />
  // },
  // {
  //   path: "products/edit/:id",
  //   element: <ProductEdit />
  // },
];

export { AdminRoutes, adminRoutesConfig };
