import React from 'react';
import './AddedToCartPopup.css';

function AddedToCartPopup({ meal, onClose, onViewCart }) {
  return (
    <div className="added-popup-backdrop">
      <div className="added-popup">
        <div className="added-popup__msg">Meal "{meal.name}" has been added to your cart.</div>
        <div className="added-popup__actions">
          <button className="added-popup__btn" onClick={onClose}>Close & Continue Shopping</button>
          <button className="added-popup__btn added-popup__btn--primary" onClick={onViewCart}>View Cart</button>
        </div>
      </div>
    </div>
  );
}

export default AddedToCartPopup; 