import { Data } from "../../../core/data/books";
import ProductCard from "./ProductCard";
import "../styles/ProductList.css";

import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";
// data is shared by one way binding method
// data is only transefered from parent to child

// but there is a work around that :)

const book_now = (id) => {
  if (getAuthUser()) {
    alert(`you are borrwing the book with id ${id}`);
    const borrow_endpoint_path = `http://localhost:4000/books/borrow-request/${id}`;

    axios
      .post(borrow_endpoint_path, { userid: getAuthUser().id })
      .then((resp) => {
        console.log(resp);
      })
      .catch((errors) => {
        console.log(errors);
      });
  } else {
    alert('please login or register to borrow a book')
  }
};

const ProductList = (props) => {
  // console.log(props.data);
  const books = props.data;

  const items = books.results;
  // const items = Data;
  const renderData = () => {
    return items.map((item) => {
      return (
        <ProductCard
          id={item.id}
          key={Date.now() * Math.random()}
          name={item.title}
          description={item.subject}
          imageLink={item.image_url}
          author={item.author}
          book_now={book_now}
          isBorrowed={books.borrow}
        />
      );
    });
  };
  const loading = () => {
    return (
      <div
        style={{ placeContent: "center", color: "brown", fontSize: "100px" }}
      >
        Loading...
      </div>
    );
  };

  return (
    <>
      {books.loading === true && loading()}
      {books.loading == false && (
        <div className="product-list">
          {items.length > 0 ? renderData() : <p>There is no Products</p>}
        </div>
      )}
    </>
  );
};

export default ProductList;
