import Select from '../../../components/Select';
import './style.css';
import Input from '../../../components/Input';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from './../../../components/Button/index';

const SignUp = () => {
  const [services, setServices] = useState([]);
  const [pg, setPg] = useState({
    name: '',
    place: '',
    portfolio: '',

    password: '',
    confirmPassword: '',
    email: '',
  });
  const [places, setplaces] = useState([]);

  //   const fetchData = async () => {
  //     const response = await axios.get('http://localhost:4999/service');
  //     setServices(
  //       response.data.map(item => {
  //         return { value: item._id, name: item.name };
  //       })
  //     );
  //   };

  const fetchLocations = async () => {
    const response = await axios.get('http://localhost:4999/location');
    response.data.map(item => {
      return { name: item.name, value: item._id };
    });
    setplaces(response.data)
  };

  const onInpChange = async (e, key) => {
    if (key == 'image') {
      const formdata = new FormData();
      formdata.append('file', e.target.files[0]);
      const response = await axios.post(
        'http://localhost:4999/image',
        formdata
      );
      setPg({ ...pg, image: response.data.url });
    } else {
      setPg({ ...pg, [key]: e.target.value });
    }
  };

  const onSignUp = async () => {
    await axios.post('http://localhost:4999/photographer/signup', pg);
  };

  console.log(pg);

    useEffect(() => {
      fetchLocations();
    }, []);
  return (
    <div className="pg-signup">
      <div className="pg-signup-form">
        <Input
          placeholder="name"
          onChange={e => {
            onInpChange(e, 'name');
          }}
        />
        <Input
          placeholder="email"
          onChange={e => {
            onInpChange(e, 'email');
          }}
        />
        <Input
          placeholder="portfolio link"
          onChange={e => {
            onInpChange(e, 'portfolio');
          }}
        />
        {/* <Select
          placeholder="services"
          array={services}
          onChange={e => {
            onInpChange(e, 'service');
          }} */}
        {/* /> */}
        <Select
          placeholder="place"
          array={places}
          onChange={e => {
            onInpChange(e, 'place');
          }}
        />
        <Input
          placeholder="password"
          type="passsword"
          onChange={e => {
            onInpChange(e, 'password');
          }}
        />
        <Input
          placeholder="confirm password"
          type="password"
          onChange={e => {
            onInpChange(e, 'confirmPassword');
          }}
        />
        <label htmlFor="profiepic" style={{color:'gray'}}>upload your image</label>
        <Input
          type="file"
          id="profilepic"
          className='profilepic-inp'
          onChange={e => {
            onInpChange(e, 'image');
          }}
        />
        <div className="signup-btn-div">
        <Link to="/photographer/login"><p style={{fontSize:'12px'}}>alredy have an account?signin</p></Link>
        <Button onClick={onSignUp}>sign up</Button>
        
        </div>
       
      </div>
    </div>
  );
};

export default SignUp;
