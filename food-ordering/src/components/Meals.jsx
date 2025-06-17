import React, { useEffect, useState } from 'react';
import MealCard from './MealCard';
import './Meals.css';

function Meals({ onAddToCart }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/meals')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch meals');
        return res.json();
      })
      .then(data => {
        setMeals(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="meals-loading">Loading meals...</div>;
  if (error) return <div className="meals-error">{error}</div>;

  return (
    <div className="meals-grid">
      {meals.map(meal => (
        <MealCard key={meal.id} meal={meal} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default Meals; 