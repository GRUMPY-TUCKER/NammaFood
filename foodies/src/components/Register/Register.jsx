import React,{useState} from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { registeredUser } from '../../service/authService';

const Register = () => {

  const navigate = useNavigate();
  const [data,setData] = useState({
    name:'',
    email:'',
    password:''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({...data, [name]:value}));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const response = await registeredUser(data);
      if (response.status === 201) {
        toast.success('User registered successfully. Please login to continue');
        navigate('/login');
      } else {
        toast.error('Unable to register user, please try again later');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Unable to register user, please try again later');
    }
  };


  return (
    <div className="register-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up </h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingName" placeholder="John Doe" name="name" onChange={onChangeHandler} value={data.name} required/>
                <label htmlFor="floatingName">Full Name</label>
              </div>

              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={onChangeHandler} value={data.email} required/>
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={onChangeHandler} value={data.password} required/>
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="d-grid">
                <button className="btn btn-success btn-login text-uppercase fw-bold" type="submit">SignUp</button>
              </div>

              <div className="d-grid">
                <button className="btn btn-outline-danger btn-login text-uppercase fw-bold mt-2" type="submit">Reset</button>
              </div>

              <hr className="my-4"/>
              <div className="mt-4">
                Already have an account? <Link to="/login" className="link-success">Sign In</Link>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register;