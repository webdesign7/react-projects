import React, { useState } from 'react';
import Header from './components/Header';
import Meals from './components/Meals';
import CartModal from './components/CartModal';
import CheckoutForm from './components/CheckoutForm';
import AddedToCartPopup from './components/AddedToCartPopup';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [showAddedPopup, setShowAddedPopup] = useState(false);
  const [lastAddedMeal, setLastAddedMeal] = useState(null);

  // Add or increase quantity
  const handleAddToCart = (meal) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...meal, quantity: 1 }];
      }
    });
    setLastAddedMeal(meal);
    setShowAddedPopup(true);
  };

  // Decrease quantity or remove
  const handleRemoveFromCart = (mealId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === mealId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Increase quantity
  const handleIncreaseQty = (mealId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === mealId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Open/close cart modal
  const openCart = () => {
    setCartOpen(true);
    setCheckout(false);
    setShowAddedPopup(false);
  };
  const closeCart = () => {
    setCartOpen(false);
    setCheckout(false);
  };

  const goToCheckout = () => setCheckout(true);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Handle order submit (for now just close modal and clear cart)
  const handleOrderSubmit = (formData) => {
    // Here you would send order to backend
    setCartItems([]);
    // setCartOpen(false); // Comment out to keep modal open
    //setCheckout(false);
    // Optionally show a success message
    setShowAddedPopup(false);
  };

  const handleClosePopup = () => setShowAddedPopup(false);

  return (
    <>
      <Header cartCount={totalCount} onCartClick={openCart} />
      <Meals onAddToCart={handleAddToCart} />
      {cartOpen && !checkout && (
        <CartModal
          items={cartItems}
          onClose={closeCart}
          onAdd={handleIncreaseQty}
          onRemove={handleRemoveFromCart}
          onCheckout={goToCheckout}
        />
      )}
      {cartOpen && checkout && (
        <CheckoutForm
          total={totalAmount}
          onClose={closeCart}
          onSubmit={handleOrderSubmit}
          cartItems={cartItems}
        />
      )}
      {showAddedPopup && lastAddedMeal && (
        <AddedToCartPopup
          meal={lastAddedMeal}
          onClose={handleClosePopup}
          onViewCart={openCart}
        />
      )}
    </>
  );
}

export default App;
