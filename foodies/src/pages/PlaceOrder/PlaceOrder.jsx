import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { calculateCartTotals } from '../../util/cartUtils';
import axios from 'axios';
import {RAZORPAY_KEY} from '../../util/constants';
import Razorpay from "razorpay";


const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } = useContext(StoreContext);
  const navigate = useNavigate();

 const [data,setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
    state: '',
    city: '',
    zip: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value
    }));
  }
  
  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:8080/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuantities({}); // Clear quantities in context
      toast.success('Cart cleared successfully!');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear the cart. Please try again.');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
        await axios.delete(`http://localhost:8080/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
    }catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete the order. Please try again.');
    }
};

  const verifyPayment = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id : razorpayResponse.razorpay_payment_id,
      razorpay_order_id : razorpayResponse.razorpay_order_id,
      razorpay_signature : razorpayResponse.razorpay_signature
    };
    try {
      const response = axios.post('http://localhost:8080/api/orders/verify', paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 200){
        toast.success('Payment verified successfully!');
        await clearCart();
        navigate('/myorders'); // Redirect to orders page after successful payment
      }else{
        toast.error('Payment verification failed. Please try again.');
        navigate('/'); // Redirect to home page if payment verification fails
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast.error('Payment verification failed. Please try again.');
      //navigate('/'); // Redirect to home page if payment verification fails
    }
  };

  const initiateRazorPayPayment = (order) => {
    const options ={
      key: RAZORPAY_KEY,
      amount: order.amount, // Amount in paise
      currency: 'INR',
      name: 'NammaFood',
      description: 'Food Order Payment',
      order_id: order.razorpayOrderId, // RazorPay order ID
      handler: async function (razorpayResponse) {
        await verifyPayment(razorpayResponse);
      },
      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber
      },
      theme: {
        color: '#3399cc'
      },
      modal:{
        ondismiss: async function() {
          toast.error('Payment cancelled. Please try again.');
          await deleteOrder(order.id);
        }
      }
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();

  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('data', data);
    // Perform any additional actions with the form data here
    const orderData = {
      userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map((item) => ({
        foodId: item.id,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category : item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name
      })),
      amount: total.toFixed(2),
      orderStatus: 'Preparing'
    };
    try {
      const response = await axios.post('http://localhost:8080/api/orders/create', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 201 && response.data.razorpayOrderId){ 
        //initiate the payment process here
        // Define the initiateRazorPayPayment function
        initiateRazorPayPayment(response.data);
        toast.success('Order placed successfully!');
      }
      else{
        toast.error('Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place the order. Please try again.');
    }
};

  // State for promo code and discount
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Filter cart items
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  // Calculate subtotal, shipping, tax, and total
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities, discount);

  // Handle promo code application
  const applyPromoCode = (e) => {
    e.preventDefault();
    if (promoCode === 'NammaFood2025') {
      setDiscount(100); // Apply Rs. 100 discount
      toast.success('Promo code applied successfully! Rs. 100 discount added.');
    } else {
      setDiscount(0); // No discount for invalid promo code
      toast.error('Invalid Promo Code. Please try again.');
    }
  };

  return (
    <div className="container mt-2">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <main>
        <div className="py-5 text-center">
          <img className="d-block mx-auto" src={assets.logo} alt="" width="98" height="98" />
        </div>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
                  </div>
                  <span className="text-body-secondary">
                    &#8377;{item.price * quantities[item.id]}.00
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>Shipping</span>
                </div>
                <span className="text-body-secondary">
                  &#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div>
                  <span>Tax (10%)</span>
                </div>
                <span className="text-body-secondary">&#8377;{tax.toFixed(2)}</span>
              </li>
              {discount > 0 && (
                <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                  <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>NammaFood2025</small>
                  </div>
                  <span className="text-success">−&#8377;{discount.toFixed(2)}</span>
                </li>
              )}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong>&#8377;{total.toFixed(2)}</strong>
              </li>
            </ul>

            <form className="card p-2" onSubmit={applyPromoCode}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3 me-2">
              Billing address <i className="bi bi-receipt-cutoff"></i>
            </h4>
            <form className="needs-validation" onSubmit={onSubmitHandler}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input type="text" className="form-control" id="firstName" placeholder="John" required name='firstName' onChange={onChangeHandler} value={data.firstName}/>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input type="text" className="form-control" id="lastName" placeholder="Doe" required name='lastName' value={data.lastName} onChange={onChangeHandler} />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input type="email" className="form-control" id="email" placeholder="Email" required name='email' value={data.email} onChange={onChangeHandler}/>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input type="text" className="form-control" id="address" placeholder="Address" required value={data.address} name='address' onChange={onChangeHandler}/>
                </div>

                <div className="col-12">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input type="number" className="form-control" id="phone" placeholder="9856789051" required value={data.phoneNumber} name='phoneNumber'  onChange={onChangeHandler}/>
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select className="form-select" id="state" required value={data.state} name='state' onChange={onChangeHandler}>
                    <option value="">Choose...</option>
                    <option>West Bengal</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <select className="form-select" id="city" required value={data.city} name='city' onChange={onChangeHandler}>
                    <option value="">Choose...</option>
                    <option>Kolkata</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input type="number" className="form-control" id="zip" placeholder="700067" required value={data.zip} name='zip' onChange={onChangeHandler}/>
                </div>
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length === 0}>
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceOrder;