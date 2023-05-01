import React, { useState , useEffect} from "react";
import "./LoginForm.css";
import axios from 'axios';
import { setAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
const login_endpoint_path = "http://localhost:4000/auth/login";
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email:'',
    password:'',
    loading:false,
    err:[],
    userData:null
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/login", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        console.log(resp.data[0]);
        setLogin({ ...login, loading: false, err: [] , userData:resp.data[0]});
        setAuthUser(login.userData);
        navigate("/");
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: errors.response.data.errors,
        });
      });
      
  };


  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <h1>Log In</h1>
        <div className="form-group">
          <label htmlFor="username"> Email</label>
          <input
            type="email"
            id="username"
            value={login.email}
            onChange={(e) => setLogin({...login,email:e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={login.password}
            onChange={(e) => setLogin({...login,password:e.target.value})}
            required
          />
        </div>
        <button type="submit" disabled={login.loading === true}>Log In</button>
        <div className="form-group">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          {
            login.err.map((error, index) => (
              <label key={index} style={{
                background:'white',
                color:'red'
              }}>
                {error.msg}
              </label>
      ))}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
