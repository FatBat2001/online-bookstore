import ProductList from "./components/ProductList";
import { SearchPanel } from "./components/SearchPanel";
import { useState, useEffect } from "react";
import axios from "axios";
import './styles/Home.css';

const Home = () =>  {

    const view_book_endpoint_path = "http://localhost:4000/books/view-books";

    const [books, setbooks] = useState({  
        loading:true,
        results:[],
        err:null,
        reload: 0,
        borrow:0,
    });
    
    const [searchKey, setsearchKey] = useState('');

    useEffect(() => {
        setbooks({...books, loading:true});
        console.log(searchKey);
        let query_path = view_book_endpoint_path;
        if (searchKey !== '') {
            // console.log('changed');
            query_path = query_path + "?search="+searchKey;
        }
        axios.get(query_path)
        .then((resp) => {
            // console.log(resp);
            setbooks({...books, results:resp.data, loading:false, err:null})
        }).
        catch((err) => {
            setbooks({...books,  loading:false, err:"something went wrong!!!"})
        });
    }, [searchKey])
    
    
    const handleSearchKey = (key) => {
        // console.log(`Search Keyword is ${searchKey} from parent`);
        setsearchKey(key);
    }
    
    
    return (
        <div className="container">
            <div className="nav-panel" > 
                <SearchPanel onData={handleSearchKey}/>
            </div>
            <ProductList  data={books}className ="content"/>
        </div>
    );
}

export default Home;
