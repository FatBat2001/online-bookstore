import { createBrowserRouter } from "react-router-dom";

import { About } from "./pages/about/About";
import { Contact } from "./pages/contact/Contact";
import App from "./App";
import { NotFound } from "./shared/NotFound";
import { ProductInfo } from "./pages/product/components/ProductInfo";
import LoginForm from "./pages/Login/LoginForm";
import RegistrationForm from "./pages/Registeration/Components/RegistrationForm";
import Home from "./pages/product/Home";
import AllBooks from "./dashboard/views/books/AllBooks";
import AddBook from "./dashboard/views/books/AddBook";
import UpdateBook, { UpdateBookLoader } from "./dashboard/views/books/UpdateBook";
import Dashboard from "./dashboard/Dashboard";
import Books from "./dashboard/views/books/Books";




export const router = createBrowserRouter([
  {

    // nesting children substyles
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: 'product-info/:id',
        element: <ProductInfo />
      },
      {
        path: "contact",
        element: <Contact />
      },
    ]
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "books",
        element: <Books />,
        children: [
          {
            index: true,
            element: <AllBooks />,
          },
          {
            path: "add_book",
            element: <AddBook />
          },
          {
            path: "update_book/:id",
            loader: UpdateBookLoader,
            element: <UpdateBook />
          },
        ]
      },
    ]
  },
  {
    // represents the wild card for any wrong 
    // path 
    path: "*",
    element: <NotFound />
  },
  {
    path: '/Login',
    element: <LoginForm />,
  },
  {
    path: '/Register',
    element: <RegistrationForm />,
  }

]);

