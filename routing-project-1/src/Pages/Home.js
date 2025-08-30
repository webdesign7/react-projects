import {Link, useNavigate} from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();
    function navigateToProducts() {
        navigate('/products');
    }

    return <>
        <h1>My homepage </h1>
        <p>
            This is my homepage
            Go to <Link to="/products">Products</Link>/
        </p>
        <p>
            <button onClick={navigateToProducts}>Navigate to products</button>
        </p>
    </>
}

export default HomePage;