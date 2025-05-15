import React from 'react';
import './AddFood.css';
import {assets} from '../../assets/assets';
import { useState } from 'react';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';

const AddFood = () => {
  const [image ,setImage] = useState(false);
  const [data,setData] = useState({
    name: 'Chicken Biryani',
    price: '100.00',
    category: "Biryani",
    description: 'Chicken Biryani is a fragrant and flavorful Indian rice dish made with marinated chicken, aromatic spices, and saffron-infused basmati rice, layered and cooked to perfection.'
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]: value}));
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    if(!image) {
      toast.error('Please upload an image');
      return;
    }
    //Connecting to the backend API
    try{
      await addFood(data, image);
      toast.success('Food added successfully');
      setData({
        name: 'Chicken Biryani',
        price: '100.00',
        category: "Biryani",
        description: 'Chicken Biryani is a fragrant and flavorful Indian rice dish made with marinated chicken, aromatic spices, and saffron-infused basmati rice, layered and cooked to perfection.'
      });
      setImage(null);
    }catch(error){
      console.error("Error adding food:", error);
      toast.error('Error adding food');
    }
  }
  return (
    <div
      className="addfood-bg container-fluid py-5"
      style={{
        backgroundImage: `url(${assets.addfood})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="form-container">
            <div className="form-icon">
              <img src={assets.upload} alt="Upload" className="upload" style={{
      width: "74px",
      height: "74px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #fff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.10)"
    }}/>
            </div>
            <h1 className="text-center mb-4" style={{ fontFamily: "'Times New Roman', Times, serif", fontWeight: "bold" }}>
              ADD NEW DISH</h1>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="name" name="name" placeholder="Chicken Biryani" required onChange={onChangeHandler} value={data.name}/>
                <label htmlFor="name">Dish Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" id="price" name="price" placeholder="Food Price(in Rupees)" required onChange={onChangeHandler} value={data.price}/>
                <label htmlFor="price">Food Price(in Rupees)</label>
              </div>
              <div className="form-floating mb-4">
                <select className="form-control" id="category" name="category" required onChange={onChangeHandler} value={data.category} style={{ minHeight: "60px"}}>
                  <option value="Biryani">Biryani</option>
                  <option value="Cake">Cake</option>
                  <option value="Burger">Burger</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Salad">Salad</option>
                  <option value="Ice cream">Ice Cream</option>
                  <option value="Sweets">Sweets</option>
                </select>
                <label htmlFor="category">Category</label>
              </div>
              <div className="form-floating mb-3">
                <textarea className="form-control" id="description" name="description" placeholder="Description" rows="4" required onChange={onChangeHandler} value={data.description} style={{ minHeight: "150px"}}></textarea>
                <label htmlFor="description">
                Description
                <span style={{ marginLeft: "8px" }}>
                <i className="bi bi-pencil-square"></i>
                </span>
                </label>
              </div>
              <div className="mb-4">
              <label className="file-input-label d-flex flex-column align-items-center">
              <img src={image ? URL.createObjectURL(image) : assets.chickenbiryani} alt="" width={98}
              style={{
              borderRadius: "50%",
              border: "3px solid #43a047",
              objectFit: "cover",
              marginBottom: "12px"
              }}/>
              <input type="file" className="form-control" id="image" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])}/>
              <span>
                Upload Your Dish Image You Wish To Add
                <span style={{ margin: "0 4px" }}></span>
                <i className="bi bi-emoji-smile-upside-down-fill" style={{ color: "green" }}></i>
              </span>
              </label>
              </div>
              <button type="submit" className="btn btn-success w-100 py-2">
              <i className="bi bi-arrow-right me-2"></i>
              Add Dish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddFood;