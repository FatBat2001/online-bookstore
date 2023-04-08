import {createBrowserRouter} from "react-router-dom";

import { About } from "./pages/about/About";
import {Contact} from "./pages/contact/Contact";
import App from "./App";
import { NotFound } from "./shared/NotFound";
import { ProductInfo } from "./pages/product/components/ProductInfo";
import LoginForm from "./pages/Login/LoginForm";
import RegistrationForm from "./pages/Registeration/Components/RegistrationForm";
import Home from "./pages/product/Home";
export const router = createBrowserRouter([
    {

      // nesting children substyles
      path:'/',
      element:<App />,
      children:[
        {
          path: "/",
          element: <Home />
        },
        {
          path: "about",
          element: <About/>
        },
        {
          path:'product-info/:id',
          element:<ProductInfo/>
        },
        {
            path:"contact",
            element :<Contact />
        },
        {

          // represents the wild card for any wrong 
          // path 
          path:"*",
          element:<NotFound/>
        },
        {
          path:'/Login',
          element:<LoginForm />,
        },
        {
          path:'/Register',
          element:<RegistrationForm />,
        }
      ]
    },
    
    
  ]);

