import { Data } from "../../core/data/books";
import ProductList from "../product/components/ProductList";
import axios from "axios";
import { useState, useEffect } from "react";
import {getAuthUser} from '../../helper/Storage';
const BorrowedBooks = () => {
  const DATA = {
      loading:false,
        results:Data,
        err:null,
        reload: 0,
        borrow:1
  }
  
  
  const list_borrowd_endpoint_path = "http://localhost:4000/books/get-borrow-history/" + getAuthUser().id;

  const [books, setbooks] = useState({  
      loading:true,
      results:[],
      err:null,
      reload: 0,
      borrow:1,
  });
  

  useEffect(() => {
    console.log(getAuthUser())
      setbooks({...books, loading:true});
      let query_path = list_borrowd_endpoint_path;
      const user = getAuthUser();
      console.log(user);
      axios.get(query_path)
      .then((resp) => {
          console.log(resp);
          setbooks({...books, results:resp.data, loading:false, err:null})
      }).
      catch((err) => {
        console.log(err);
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
