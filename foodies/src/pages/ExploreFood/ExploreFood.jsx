import React,{useState} from 'react';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import './ExploreFood.css'; 
const ExploreFood = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <h1 className="mb-4">Explore Food</h1>
        <p className="mb-4">Discover a variety of delicious recipes and cuisines from around the world.</p>
        <form className="d-flex flex-column align-items-center mt-3 mb-5" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group mb-3 search-bar search-tab" style={{ maxWidth: '600px' }}>
            <select className="form-select" style={{ maxWidth: '150px' }} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All</option>
              <option value="Biryani">Biryani</option>
              <option value="Pizza">Pizza</option>
              <option value="Burger">Burger</option>
              <option value="Cake">Cake</option>
              <option value="Ice Cream">Ice cream</option>
              <option value="Roll">Roll</option>
              <option value="Salad">Salad</option>
            </select>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search for your favourite food..."
              aria-label="Search"
              aria-describedby="button-addon2"
              onChange={(e) => setSearchText(e.target.value)} value={searchText}
            />
            <button className="btn btn-outline-secondary text-bg-success search-button" type="submit" id="button-addon2">
              <i className="bi bi-search me-1"></i>Search
            </button>
          </div>
        </form>
      </div>
      <FoodDisplay category={category} searchText={searchText}/>
    </div>
  );
};

export default ExploreFood;