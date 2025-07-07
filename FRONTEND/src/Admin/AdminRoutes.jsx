import { Outlet } from 'react-router-dom';

import MainContent from './Pages/AdminMain';
import AdminProducts from './Pages/AdminProduct';
import AdminCategory from './Pages/AdminCategory';
import AdminBrand from './Pages/AdminBrand';
import Order from './Pages/Order';
import OrderItem from './Pages/Order_item';
import Cart from './Pages/Cart';
import Address from './Pages/Address';
import FeaturedProduct from './Pages/Featured_Product';
import Return from './Pages/Return';
import Users from './Pages/Users';
import Review from './Pages/Review';
import Wishlist from './Pages/Wishlist';

import {
  ADMIN_PRODUCT,
  ADMIN_CATEGORY,
  ADMIN_BRAND,
  ADMIN_ORDERS,
  ADMIN_ORDER_ITEMS,
  ADMIN_CART,
  ADMIN_ADDRESS,
  ADMIN_FEATURED_PRODUCTS,
  ADMIN_RETURN,
  ADMIN_USERS,
  ADMIN_REVIEW,
  ADMIN_WISHLIST,
  ADD_PRODUCT
} from './Constants/AdminMenu';
import { Children } from 'react';
import ProductAdd from './Features/Products/Add_Product';

export const AdminRoutes = () => <Outlet />;

export const adminRoutesConfig = [
  {
    index: true, // this will match "/admin"
    element: <MainContent />,
  },
  {
    path: ADMIN_PRODUCT, // "products"
    element: <AdminProducts />,
    children:[
      {
        path:ADD_PRODUCT,
        element:<ProductAdd/>
      }
    ]
  },
  {
    path: ADMIN_CATEGORY,
    element: <AdminCategory />,
  },
  {
    path: ADMIN_BRAND,
    element: <AdminBrand />,
  },
  {
    path: ADMIN_ORDERS,
    element: <Order />,
  },
  {
    path: ADMIN_ORDER_ITEMS,
    element: <OrderItem />,
  },
  {
    path: ADMIN_CART,
    element: <Cart />,
  },
  {
    path: ADMIN_ADDRESS,
    element: <Address />,
  },
  {
    path: ADMIN_FEATURED_PRODUCTS,
    element: <FeaturedProduct />,
  },
  {
    path: ADMIN_RETURN,
    element: <Return />,
  },
  {
    path: ADMIN_USERS,
    element: <Users />,
  },
  {
    path: ADMIN_REVIEW,
    element: <Review />,
  },
  {
    path: ADMIN_WISHLIST,
    element: <Wishlist />,
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
];
