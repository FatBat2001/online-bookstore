import { Link } from "react-router-dom";
import "../styles/ProductCard.css";
// props are read only

const ProductCard = (props) => {
  return (
    <div className="product-card">
      <div className="card-top">
        <img src={props.imageLink} alt="product card" />
      </div>

      <div className="card-info">
        <h3 className="title">{props.name}</h3>
        <div className="author-name">
          <h5>by</h5>
          <h5>{props.author}</h5>
        </div>
        <p className="info">{props.description}</p>
        {/* Calling Events in React */}
        {/* <button onClick= {()=>props.watch(props.id)}>Watch Now</button> */}

        {
          !props.isBorrowed && (<button onClick={() => {props.book_now(props.id)}}>
            <Link >Read Now</Link>
          </button>)
        }
      </div>
    </div>
  );
};

export default ProductCard;
