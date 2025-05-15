import React, { useContext ,useState} from 'react';
import './Menubar.css';
import {assets} from '../../assets/assets.js';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';
import { useNavigate } from 'react-router-dom';

const Menubar = () => {
  
  const [active,setActive] = useState("home");
  const {quantities,token,setToken,setQuantities} = useContext(StoreContext);
  const uniqueItemsinCart = Object.values(quantities).filter(quantity => quantity > 0).length;
  const navigate = useNavigate();

  const logout = () => {
    // Clear user token or perform logout logic here
    localStorage.removeItem('token');
    setToken(""); // Assuming you have a function to set the token in your context or state
    setQuantities({}); // Clear the quantities state
    console.log('User logged out');
    navigate('/'); //Redirect to Home Page after logout
  };


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to="/"><img src={assets.logo} alt='' className='logo' height={48} width={48}/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={active === 'home' ? "nav-link fw-bold" : "nav-link active"} aria-current="page" to="/" onClick={()=> setActive('home')}><i class="bi bi-house-door me-1"></i>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={active === 'explore' ? "nav-link fw-bold" : "nav-link active"} to="/explore" onClick={()=> setActive('explore')}><i class="bi bi-clipboard-check me-1"></i>Explore</Link>
        </li>
        <li className="nav-item">
          <Link className={active === 'contact-us' ? "nav-link fw-bold" : "nav-link active"} to="/contact" onClick={() => setActive('contact-us')}><i class="bi bi-person-fill me-1"></i>Contact Us</Link>
        </li>
      </ul>
      <div className="menubar-right">
      <Link to="/cart">
        <div className="position-relative me-3">
            
            <img src={assets.cart} alt="" className="cart" height={48} width={48}/>
            
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{uniqueItemsinCart}</span>
        </div>
        </Link>
        {
          !token ?
          <>
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/register" className="btn btn-success">Register</Link>
          </> :
          <div className='dropdown text-end'>
            <a href='' className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={assets.user} alt="" className="rounded-circle" height={48} width={48}/>
            </a>
            <ul className="dropdown-menu text-small">
              <li className='dropdown-item cursor-pointer'  onClick={() => navigate('/myorders')}>Orders</li>
              <li className='dropdown-item cursor-pointer'  onClick={logout}>LogOut</li>
            </ul>
          </div>
        }
      </div>
    </div>
  </div>
</nav>
  )
}

export default Menubar;