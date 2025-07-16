import { Outlet } from 'react-router-dom';

import MainContent from './Pages/AdminMain';
import AdminProducts from './Pages/AdminProduct';
import AdminCategory from './Pages/AdminCategory';
import AdminBrand from './Pages/AdminBrand';
import OrderItem from './Pages/Order_item';
// import Cart from './Pages/Cart';
import Address from './Pages/Address';
import FeaturedProduct from './Pages/Featured_Product';
import Return from './Pages/Return';
import Users from './Pages/Users';
import Review from './Pages/Review';
import Wishlist from './Pages/Wishlist';
import Order from './Pages/Orders';
import ProductAdd from './Features/Products/Add_Product';

import AllUserCarts from './Pages/AllUserCart'; // ✅ new
import UserCartDetail from './Pages/UserCartDetail'; // ✅ new

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
  ADD_PRODUCT,
  UPDATE_PRODUCT
} from './Constants/AdminMenu';
import UpdateProduct from './Features/Products/Update_Product';
import AddCategory from './Features/Category/Add_Category';
import UpdateCategory from './Features/Category/Update_Category';
import AddBrand from './Features/Brands/Add_Brands';
import UpdateBrand from './Features/Brands/Update_Brands';
import UserWishlistDetails from './Pages/UserWishlistDetail';
import OrderDetail from './Pages/OrderDetail';

export const AdminRoutes = () => <Outlet />;

export const adminRoutesConfig = [
  {
    index: true, // /admin
    element: <MainContent />,
  },
  {
    path: ADMIN_PRODUCT,
    element: <AdminProducts />,
  },
  {
    path: ADD_PRODUCT,
    element: <ProductAdd />,
  },
  {
    path: "update-product/:id",
    element: <UpdateProduct />,
  },
  {
    path: ADMIN_CATEGORY,
    element: <AdminCategory />,
  },
  {
    path: "add-category",
    element: <AddCategory />,
  },
  {
    path: "update-category/:id",
    element: <UpdateCategory/>,
  },
  {
    path: ADMIN_BRAND,
    element: <AdminBrand />,
  },
  {
    path:"Add-Brand",
    element: <AddBrand />,  
  },
  {
    path: "update-brand/:id",
    element: <UpdateBrand />,
  },
  {
    path: ADMIN_ORDERS,
    element: <Order />,
  },
  {
    path: ADMIN_ORDER_ITEMS,
    element: <OrderItem />,
  },
  // {
  //   path: ADMIN_CART, // → use this for customer cart OR rename if needed
  //   element: <Cart />,
  // },
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
    path:"/admin/orders/:id",
     element:<OrderDetail />
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
    path: "/admin/user-wishlist/:userId",
    element: <UserWishlistDetails />,
  },

  // ✅ NEW: Admin All User Carts
  {
    path: ADMIN_CART, // URL: /admin/admin-carts
    element: <AllUserCarts />,
  },
  {
    path:'carts/:userId',
    element:<UserCartDetail/>
  },

  // ✅ NEW: Admin View Single User Cart
  {
    path: 'admin-cart/:userId', // URL: /admin/admin-cart/3
    element: <UserCartDetail />,
  },

  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
];
