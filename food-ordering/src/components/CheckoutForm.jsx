import React, { useState } from 'react';
import './CartModal.css';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const initialState = {
  name: '',
  email: '',
  street: '',
  postal: '',
  city: '',
};

function CheckoutForm({ total, onClose, onSubmit, cartItems }) {

  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = () => {
    const errs = {};
    if (!fields.name.trim()) errs.name = 'Full name is required';
    if (!fields.email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(fields.email)) errs.email = 'Invalid email';
    if (!fields.street.trim()) errs.street = 'Street is required';
    if (!fields.postal.trim()) errs.postal = 'Postal Code is required';
    if (!fields.city.trim()) errs.city = 'City is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true, street: true, postal: true, city: true });
    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch('http://localhost:3000/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order: {
              items: cartItems,
              customer: fields,
            },
          }),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to submit order');
        }
        
        setSuccess(true);
        setFields(initialState);
        onSubmit(fields);
      } catch (err) {
        setSubmitError(err.message || 'An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const showError = (field) => (touched[field] || errors[field]) && errors[field];

  if (success) {
    return (
      <div className="cart-modal-backdrop">
        <div className="cart-modal">
          <h2>Thank you!</h2>
          <p>Order has been submitted.</p>
          <div className="cart-modal__actions">
            <button className="cart-modal__close" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-modal-backdrop">
      <div className="cart-modal">
        <h2>Checkout</h2>
        <div className="cart-modal__total" style={{marginBottom: '1.5rem'}}>Total Amount: <span>${total}</span></div>
        {submitError && <div className="checkout-form__error" style={{marginBottom: '1rem'}}>{submitError}</div>}
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-form__group">
            <label>Full name</label>
            <input name="name" value={fields.name} onChange={handleChange} onBlur={handleBlur} />
            {showError('name') && <div className="checkout-form__error">{errors.name}</div>}
          </div>
          <div className="checkout-form__group">
            <label>Email</label>
            <input name="email" value={fields.email} onChange={handleChange} onBlur={handleBlur} />
            {showError('email') && <div className="checkout-form__error">{errors.email}</div>}
          </div>
          <div className="checkout-form__group">
            <label>Street</label>
            <input name="street" value={fields.street} onChange={handleChange} onBlur={handleBlur} />
            {showError('street') && <div className="checkout-form__error">{errors.street}</div>}
          </div>
          <div className="checkout-form__group">
            <label>Postal Code</label>
            <input name="postal" value={fields.postal} onChange={handleChange} onBlur={handleBlur} />
            {showError('postal') && <div className="checkout-form__error">{errors.postal}</div>}
          </div>
          <div className="checkout-form__group">
            <label>City</label>
            <input name="city" value={fields.city} onChange={handleChange} onBlur={handleBlur} />
            {showError('city') && <div className="checkout-form__error">{errors.city}</div>}
          </div>
          <div className="cart-modal__actions">
            <button type="submit" className="cart-modal__checkout" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Order'}
            </button>
            <button type="button" className="cart-modal__close" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm; 