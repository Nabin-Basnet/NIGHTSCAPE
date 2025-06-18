import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserLayout from "./layouts/UserLayout";
import LoginForm from "./auth/LoginPage";
import SignupForm from "./auth/Signup"; 
import { ABOUT_ROUTE, 
        HOME_ROUTE, 
        PRODUCTS_ROUTE,
        CUSTOM_DESIGN_ROUTE,
        BEST_SELLER,
        OFFER_ROUTE,
        SIGNUP_ROUTE,
        LOGIN_ROUTE,
        ACCOUNT_ROUTE,
     } from "./constants/navMenu";
import SinglePageProduct from "./pages/SingleProductPage";
import SingleProductPage from "./pages/SingleProductPage";
import CustonDesign from "./pages/CustonDesign";
import BestSeller from "./pages/BestSeller";
import Offer from "./pages/Offer";
import Account from "./pages/Account";

const router=createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: HOME_ROUTE,
                element:<Home/>
            },
            
            {
                path: PRODUCTS_ROUTE,
                element:<Products/>
            },
            {
                path: "/products/:id",
                element: <SinglePageProduct />
            },
            {
                path: PRODUCTS_ROUTE,
                children: [
                    {
                        index: true,
                        element: <Products />
                    },
                    {
                        path: ":id",
                        element: <SinglePageProduct />
                    }
                ]
            },
            {
                path: ABOUT_ROUTE,
                element:<About/>
            },
            {
                path: CUSTOM_DESIGN_ROUTE,
                element:<CustonDesign/>
            },
            {
                path: BEST_SELLER,
                element:<BestSeller/>
            },
            {
                path: OFFER_ROUTE,
                element:<Offer/>
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/product",
                element:<SingleProductPage/>
            },
            
        ]
    },
 
    {
        path: LOGIN_ROUTE,
        element: <LoginForm />
    },
    {
        path: SIGNUP_ROUTE,
        element: <SignupForm />
    },
    {
        path: ACCOUNT_ROUTE,
        element: <Account />
    }
    
]);

export default router