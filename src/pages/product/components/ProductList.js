import { Data } from "../../../core/data/books";
import ProductCard from "./ProductCard";
import '../styles/ProductList.css';


// data is shared by one way binding method 
// data is only transefered from parent to child 

// but there is a work around that :) 

const watchNow = (id) => {
    console.log('we clicked video id: ', id);
}


const ProductList = (props) => {
    // console.log(props.data);
    const books = props.data;
    
    const items = books.results;
    const renderData = () => {
        return items.map(
            (item)=> {
                return <
                ProductCard 
                id = {item.id}
                key={item.id}
                name={item.title}
                description={item.subject}
                imageLink={item.image_url}
                author = {item.author}
                watch = {watchNow}
            />
            }
        )
        
    }
    const loading = () => {
        return (<div style={{placeContent:'center',color:'brown', fontSize:'100px'}}>Loading...</div>);
    };

    return (
        
        <>
            {books.loading === true && (loading())}
            {
                books.loading == false &&
                <div className="product-list">
                    {
                        items.length > 0 ? renderData() : <p>There is no Products</p>
                    }
                </div>
            }
        </>
       
    );
};

export default ProductList;