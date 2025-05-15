import React,{useState,useContext} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../service/authService';
import { StoreContext } from '../../context/StoreContext';

const Login = () => {


  const navigate = useNavigate();
  const {setToken,loadCartData} = useContext(StoreContext);


  const [data,setData] = useState({
    email:"",
    password:""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]:value}));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('data', data);
    try {
      const response = await loginUser(data);
      console.log('response', response);
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        await loadCartData(response.data.token); // Load cart data
        toast.success('Login successful');
        navigate('/');
      } else {
        toast.error('Unable to login, please try again later');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Unable to login, please try again later');
    }
  };


  return (
    <div className="login-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Log In </h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={onChangeHandler} value={data.email} required/>
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={onChangeHandler} value={data.password} required/>
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="d-grid">
                <button className="btn btn-success btn-login text-uppercase fw-bold" type="submit">Login</button>
              </div>

              <div className="d-grid">
                <button className="btn btn-outline-danger btn-login text-uppercase fw-bold mt-2" type="submit">Reset</button>
              </div>

              <hr className="my-4"/>
              <div className="mt-4">
                Don't have an account? <Link to="/register" className="link-success">Sign Up</Link>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;