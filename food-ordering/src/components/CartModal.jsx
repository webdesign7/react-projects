import React from 'react';
import './CartModal.css';

function CartModal({ items, onClose, onAdd, onRemove, onCheckout }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-modal-backdrop">
      <div className="cart-modal">
        <h2>Your Cart</h2>
        {items.length === 0 ? (
          <p className="cart-modal__empty">Your cart is empty.</p>
        ) : (
          <ul className="cart-modal__list">
            {items.map(item => (
              <li key={item.id} className="cart-modal__item">
                <div className="cart-modal__info">
                  <span className="cart-modal__name">{item.name}</span>
                  <span className="cart-modal__price">${item.price}</span>
                </div>
                <div className="cart-modal__qty-controls">
                  <button onClick={() => onRemove(item.id)} className="cart-modal__qty-btn">-</button>
                  <span className="cart-modal__qty">{item.quantity}</span>
                  <button onClick={() => onAdd(item.id)} className="cart-modal__qty-btn">+</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-modal__total">
          Total: <span>${total}</span>
        </div>
        <div className="cart-modal__actions">
          {onCheckout && items.length > 0 && (
            <button className="cart-modal__checkout" onClick={onCheckout}>Go To Checkout</button>
          )}
          <button className="cart-modal__close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default CartModal; 