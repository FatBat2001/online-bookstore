import { Data } from "../../core/data/books";
import ProductCard from "./components/ProductCard";
import './styles/ProductList.css';

// data is shared by one way binding method 
// data is only transefered from parent to child 

// but there is a work around that :) 

const watchNow = (id) => {
    console.log('we clicked video id: ', id);
}


const ProductList = () => {
    const items = Data;
    const renderData = () => {
        return items.map(
            (item)=> {
                return <
                ProductCard 
                id = {item.id}
                key={item.id}
                name={item.name}
                description={item.description}
                imageLink={item.image}
                author = {item.author}
                watch = {watchNow}
            />
            }
        )
    }

    return (
       <div className="product-list">
        {
            items.length > 0 ? renderData() : <p>There is no Products</p>
        }
       </div>
    );
};

export default ProductList;