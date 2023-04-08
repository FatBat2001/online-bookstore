import { useParams } from 'react-router-dom';
export const ProductInfo = () => {
    
    let { id } = useParams();
    // console.log(id);
    return (
        <h1>Product Info ...</h1>
    );
}
