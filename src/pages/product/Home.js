import ProductList from "./components/ProductList";
import { SearchPanel } from "./components/SearchPanel";
import './styles/Home.css';
// import { useState } from "react";
const Home = () =>  {
    return (
        <div className="container">
            <div className="nav-panel"> 
                <SearchPanel />
            </div>
            <ProductList className ="content"/>
        </div>
    );
}

export default Home;