import './style.css';
import Input from './../../../components/Input/index';
import Button from '../../../components/Button';
import { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [login, setLogin] = useState(true);
  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });
  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()
  const onClick = () => {
    setLogin(true);
  };
  const onClick2 = () => {
    setLogin(false);
  };

  const signUpChange = (e, key) => {
    setSignUp({ ...signUp, [key]: e.target.value });
  };
  const signInChange = (e, key) => {
    setSignIn({ ...signIn, [key]: e.target.value });
  };
  const signInClick = async () => {
    const response = await axios.post(
      'http://localhost:4999/user/signin',
      signIn
    );
    alert(response.data.message);
    
    if(response.data.token){
  
      localStorage.setItem('token',response.data.token)
      navigate('/')
    }
   
  };
  const signUpClick = async () => {
    await axios.post('http://localhost:4999/user/signup', signUp);
    alert('account creatred');
  };
  return (
    <div className="user-login">
      <div className="form-container">
        <div className="options">
          <p
            onClick={onClick}
            style={
              login
                ? {
                    color: 'red',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }
                : { color: '', cursor: 'pointer' }
            }
          >
            login
          </p>
          <p
            onClick={onClick2}
            style={
              login
                ? { color: '', cursor: 'pointer' }
                : {
                    color: 'red',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }
            }
          >
            signup
          </p>
        </div>
        {login ? (
          <div className="user-login-form">
            <Input
              placeholder="email"
              className="user-login-inp"
              onChange={e => {
                signInChange(e, 'email');
              }}
            />
            <Input
              placeholder="password"
              className="user-login-inp"
              onChange={e => {
                signInChange(e, 'password');
              }}
            />
            <Button onClick={signInClick}>login</Button>
          </div>
        ) : (
          <div className="user-signup-form">
            <Input
              placeholder="name"
              className="user-login-inp"
              onChange={e => {
                signUpChange(e, 'name');
              }}
            />
            <Input
              placeholder="email"
              className="user-login-inp"
              onChange={e => {
                signUpChange(e, 'email');
              }}
            />
            <Input
              placeholder="contact number"
              className="user-login-inp"
              onChange={e => {
                signUpChange(e, 'contact');
              }}
            />
            <Input
              placeholder="password"
              className="user-login-inp"
              onChange={e => {
                signUpChange(e, 'password');
              }}
            />
            <Input
              placeholder="confirm password"
              className="user-login-inp"
              onChange={e => {
                signUpChange(e, 'confirmPassword');
              }}
            />
            <Button onClick={signUpClick}>sign up</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
