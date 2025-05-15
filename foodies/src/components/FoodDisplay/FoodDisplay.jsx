import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../Fooditem/Fooditem';

const FoodDisplay = ({category,searchText}) => {

  const { foodList } = useContext(StoreContext);
  
  const filteredFoods = foodList.filter((food) => {
    // if (category === 'All') return true; // Show all food items
    // return food.category === category; // Filter by selected category
    return (category === 'All' || food.category === category) && food.name.toLowerCase().includes(searchText.toLowerCase());
  })

  return (
    <div className="container mt-4">
    <div className="row g-4"> {/* Add Bootstrap's row class */}
      {filteredFoods.length > 0 ? (
        filteredFoods.map((food, index) => (
          <Fooditem
            key={index}
            name={food.name}
            description={food.description}
            id={food.id}
            imageUrl={food.imageUrl}
            price={food.price}
          />
        ))
      ) : (
        <div className="text-center mt-4">
          <h4>No Food Found</h4>
        </div>
      )}
    </div>
    </div>
  );
};

export default FoodDisplay;