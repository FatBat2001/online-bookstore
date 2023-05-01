import { Data } from "../../core/data/books";
import ProductList from "../product/components/ProductList";
import axios from "axios";
import { useState, useEffect } from "react";
const BorrowedBooks = () => {
  const DATA = {
      loading:false,
        results:Data,
        err:null,
        reload: 0,
        borrow:1
  }

  
  const view_book_endpoint_path = "http://localhost:4000/books/view-books";

  const [books, setbooks] = useState({  
      loading:true,
      results:[],
      err:null,
      reload: 0,
      borrow:1,
  });
  

  useEffect(() => {
      setbooks({...books, loading:true});
      let query_path = view_book_endpoint_path;
      
      axios.get(query_path)
      .then((resp) => {
          // console.log(resp);
          setbooks({...books, results:resp.data, loading:false, err:null})
      }).
      catch((err) => {
          setbooks({...books,  loading:false, err:"something went wrong!!!"})
      });
  }, [])
  
  
  
  return (
      <div className="container">
          <ProductList  data={books}className ="content"/>
      </div>
  );
};

export default BorrowedBooks;
