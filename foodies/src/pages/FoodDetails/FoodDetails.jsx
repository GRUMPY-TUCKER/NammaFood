import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useState,useEffect} from 'react';
import { fetchFoodDetais } from '../../service/foodService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FoodDetails.css';
import { StoreContext } from '../../context/StoreContext';
const FoodDetails = () => {
    const {id} = useParams();
    const [data, setData] = useState({});

    const {increaseQty} = useContext(StoreContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        //calling the food service to fetch the food details
        const loadFoodDetails = async () => {
            try {
                const foodData = await fetchFoodDetais(id);
                setData(foodData);
            } catch (error) {
                //console.error('Error fetching food details:', error);
                //throw error; // Rethrow the error to handle it in the calling function
                toast.error('Error while fetching food details:', error);
            }
        }
        loadFoodDetails();
    }, [id]);

    const addToCart = () => {
      increaseQty(data.id);
      navigate('/cart');
      toast.success('Food item added to cart successfully!');
    }
  return (
    <section className="food-details py-5">
    <div className="container px-4 px-lg-5 my-5">
      <div className="row gx-4 gx-lg-5 align-items-center">
        <div className="col-md-6">
          <img
            className="card-img-top mb-5 mb-md-0 shadow rounded food-image"
            src={data.imageUrl}
            alt={data.name}
          />
        </div>
        <div className="col-md-6">
          <div className="fs-5 mb-1 me-2">
            Category: <span className="badge fs-5 text-bg-success">{data.category}</span>
          </div>
          <h1 className="display-5 fw-bolder">{data.name}</h1>
          <div className="fs-5 mb-2">
            <span className="text-success">&#8377;{data.price}.00</span>
          </div>
          <p className="lead">{data.description}</p>
          <div className="d-flex">
            <button className="btn btn-success flex-shrink-0" type="button" onClick={addToCart}>
              <i className="bi-cart-fill me-1"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default FoodDetails;