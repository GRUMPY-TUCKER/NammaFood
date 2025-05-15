import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { calculateCartTotals } from '../../util/cartUtils';

const Cart = () => {
  const navigate = useNavigate();
  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } = useContext(StoreContext);

  // State for promo code
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // Discount amount

  // Filter cart items
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  // Calculate subtotal, shipping, tax, and total
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities, discount);

  // Handle promo code application
  const applyPromoCode = () => {
    if (promoCode === 'NammaFood2025') {
      setDiscount(100); // Apply Rs. 100 discount
      toast.success('Promo code applied successfully! Rs. 100 discount added.');
    } else {
      setDiscount(0); // No discount for invalid promo code
      toast.error('Invalid Promo Code. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer /> {/* Add ToastContainer here */}
      <h1 className="mb-5 text-center">YOUR OWN FOOD CART</h1>
      <div className="row">
        {/* Cart Items Section */}
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <p className="text-center">Your Cart is empty.</p>
          ) : (
            <div className="card mb-4">
              <div className="card-body">
                {cartItems.map((food) => (
                  <div className="row mb-4 align-items-center" key={food.id}>
                    <div className="col-md-3 text-center">
                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="img-fluid rounded"
                        style={{ maxWidth: '100px' }}
                      />
                    </div>
                    <div className="col-md-5">
                      <h5 className="mb-1">{food.name}</h5>
                      <p className="text-muted mb-1">{food.description}</p>
                      <span className="fw-bold">&#8377;{food.price}</span>
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-secondary btn-sm me-2"
                        onClick={() => decreaseQty(food.id)}
                      >
                        <i className="bi bi-dash-circle"></i>
                      </button>
                      <span className="fw-bold">{quantities[food.id]}</span>
                      <button
                        className="btn btn-secondary btn-sm ms-2"
                        onClick={() => increaseQty(food.id)}
                      >
                        <i className="bi bi-plus-circle"></i>
                      </button>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className="fw-bold mb-1">
                        &#8377;{(food.price * quantities[food.id]).toFixed(2)}
                      </p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          removeFromCart(food.id);
                          toast.error(`${food.name} removed from cart.`);
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
                <hr />
              </div>
            </div>
          )}
          <div className="text-start mb-4">
            <Link to="/" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="col-lg-4">
          <div className="card cart-summary">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>&#8377;{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>&#8377;{shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <span>&#8377;{tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="d-flex justify-content-between mb-3 text-success">
                  <span>Discount</span>
                  <span>-&#8377;{discount.toFixed(2)}</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>&#8377;{total.toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-success w-100"
                disabled={cartItems.length === 0}
                onClick={() => navigate('/order')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Apply Promo Code</h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={applyPromoCode}>
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;