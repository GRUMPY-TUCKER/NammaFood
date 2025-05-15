import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 mt-1 header">
        <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold text-brown">Order your favourite food!</h1>
        <p className="col-md-8 fs-4 text-brown">Discover the best food and drinks in your city</p>

        <Link to="/explore" className='btn btn-success btn-lg'>Explore Now</Link>
        </div>
    </div>
  )
}

export default Header;