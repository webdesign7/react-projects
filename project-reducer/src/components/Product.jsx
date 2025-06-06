import { useContext } from 'react';
import {ShoppingCartContext} from "../state/shopping-cart-context.jsx";

export default function Product({
  id,
  image,
  title,
  price,
  description,
}) {

  const { onAddItemToCart } = useContext(ShoppingCartContext);

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button onClick={() => onAddItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
