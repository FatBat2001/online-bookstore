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
import BorrowRequests from "./dashboard/views/borrowRequests/BorrowRequests";
import BorrowHistory from "./dashboard/views/borrowRequests/BorrowHistory";
import Borrows from "./dashboard/views/borrowRequests/Borrows";
import Accounts from "./dashboard/views/usersRequests/Accounts";
import AccountRequests from "./dashboard/views/usersRequests/AccountRequests";
import AccountHistory from "./dashboard/views/usersRequests/AccountHistory";
import BorrowedBooks from "./pages/BorrowedBooks/BorrowedBooks";
import Guest from "./middleware/Guest";
import AdminAuth from './middleware/AdminAuth';


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
        element :<AdminAuth/>,
        children:[
          {
            path: "contact",
            element: <Contact />
          },
        ]
      },

      // all guest routes should be nested inside this guest helper
      {
        element:<Guest/>,
        children: [
          {
            path: '/Login',
            element: <LoginForm />,
          },
          {
            path: '/Register',
            element: <RegistrationForm />,
          }
        ]
      },
      {
        path:'/borrowed',
        element: <BorrowedBooks />
      }
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
      {
        path: "borrowReq",
        element: <Borrows />,
        children: [
          {
            index: true,
            element: <BorrowRequests />,
          },
          {
            path: "history",
            element: <BorrowHistory />,
          }
        ]
      },
      {
        path: "accountReq",
        element: <Accounts />,
        children: [
          {
            index: true,
            element: <AccountRequests />,
          },
          {
            path: "history",
            element: <AccountHistory />,
          }
        ]
      }
    ]
  },
  {
    // represents the wild card for any wrong 
    // path 
    path: "*",
    element: <NotFound />
  },
  

]);

