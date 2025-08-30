import {Link} from "react-router-dom";

const products = [
    {id: 1, name: 'Product 1'},
    {id: 2, name: 'Product 2'},
    {id: 3, name: 'Product 3'},
];

function Products() {
    return (
        <>
            <h1>Products</h1>
            <ul>
                {products.map(product => <li key={product.id}>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                </li>)}
            </ul>
        </>
    )
}


export default Products;