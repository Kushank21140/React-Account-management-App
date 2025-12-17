import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '../Context/Auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "", password: ""
  });

  const [error, setError] = useState('');

  const { login } = useContext(Auth);
  const navigate = useNavigate();

  const { email, password } = formData;

  const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValidator = password.length >= 6;

  const btn_disable = emailValidator && passwordValidator;

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((formdata) => ({
      ...formdata,
      [name]: value
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const success = login(email, password);

      if (success) navigate('/Home')

      setError("Invalid credentials");


    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (




    <form onSubmit={handleSubmit} className='form'>
      <div className='container'>
        <div className='row'>

          <div className='col-lg-4 col-md-4 mx-auto'>

            <div className='card '>

              <div className='card-header'> Login to your account</div>

              <div className='card-body mt-2'>

                <input
                  type='email'
                  name="email"
                  placeholder='Email'
                  value={email}
                  onChange={handleChange}
                  className='form-control mb-3'
                />
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  value={password}
                  onChange={handleChange}
                  className='form-control mb-3'
                />

                {error && <p className='text-danger'>{error}</p>}

                <div className='d-flex justify-content-center mb-3'>
                  <button
                    className="btn btn-outline-primary btn-md "
                    type="submit"
                    disabled={!btn_disable} >
                    Log in
                  </button>
                </div>

                <div className='card-footer text-center'>

                  <p>
                    <Link to="/Register">Don't have an account? Register</Link>
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </form>
  );
};

export default Login;
