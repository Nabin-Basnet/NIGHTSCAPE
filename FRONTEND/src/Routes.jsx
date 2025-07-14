import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserLayout from "./layouts/UserLayout";
import LoginForm from "./auth/LoginPage";
import SignupForm from "./auth/Signup";
import SinglePageProduct from "./pages/SingleProductPage";
import CustonDesign from "./pages/CustonDesign";
import BestSeller from "./pages/BestSeller";
import Offer from "./pages/Offer";
import Account from "./pages/Account";

import AdminLayout from "./Admin/Layouts/AdminLayout";
import { AdminRoutes, adminRoutesConfig } from "./Admin/AdminRoutes";

import {
  ABOUT_ROUTE,
  HOME_ROUTE,
  PRODUCTS_ROUTE,
  CUSTOM_DESIGN_ROUTE,
  BEST_SELLER,
  OFFER_ROUTE,
  SIGNUP_ROUTE,
  LOGIN_ROUTE,
  ACCOUNT_ROUTE,
  ADMIN_ROUTE,
  CART_ROUTE,
  WISHLIST_ROUTE,
  PAYMENT_ROUTE,
} from "./constants/navMenu";
import CartPage from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import PaymentPage from "./pages/PaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: HOME_ROUTE,
        element: <Home />,
      },
      {
        path: PRODUCTS_ROUTE,
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ":id",
            element: <SinglePageProduct />,
          },
        ],
      },
      {
        path: ABOUT_ROUTE,
        element: <About />,
      },
      {
        path: CUSTOM_DESIGN_ROUTE,
        element: <CustonDesign />,
      },
      {
        path: BEST_SELLER,
        element: <BestSeller />,
      },
      {
        path: OFFER_ROUTE,
        element: <Offer />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      // {
      //   path: "sinproduct",
      //   element: <SinglePageProduct />,
      // },
    ],
  },

  {
    path: LOGIN_ROUTE,
    element: <LoginForm />,
  },
  {
    path: SIGNUP_ROUTE,
    element: <SignupForm />,
  },
  {
    path: ACCOUNT_ROUTE,
    element: <Account />,
  },
  {
    path: CART_ROUTE,
    element: <CartPage />,
  },
  {
    path:WISHLIST_ROUTE,
    element:<Wishlist />
  },
  {
    path:PAYMENT_ROUTE,
    element:<PaymentPage />
  },
  {
    path: ADMIN_ROUTE,
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminRoutes />,
        children: adminRoutesConfig,
      },
    ],
  },
]);

export default router;
