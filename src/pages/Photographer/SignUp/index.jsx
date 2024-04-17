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
  const [places, setplaces] = useState([
    { name: 'kasargod', value: 'kasargod' },
    { name: 'kannur', value: 'kannur' },
    { name: 'wayanad', value: 'wayanad' },
    { name: 'kozhikod', value: 'kozhikod' },
    { name: 'palakkad', value: 'palakkad' },
    { name: 'thrissur', value: 'thrissur' },
    { name: 'ernakulam', value: 'ernakulam' },
  ]);

//   const fetchData = async () => {
//     const response = await axios.get('http://localhost:4999/service');
//     setServices(
//       response.data.map(item => {
//         return { value: item._id, name: item.name };
//       })
//     );
//   };

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

  const onSignUp=async()=>{
    await axios.post('http://localhost:4999/photographer/signup',pg)
  }

  console.log(pg);

//   useEffect(() => {
//     fetchData();
//   }, []);
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

        <Input
          type="file"
          onChange={e => {
            onInpChange(e, 'image');
          }}
        />
        <Button onClick={onSignUp}>sign up</Button>
        <Link to='/photographer/login'>have an account?sign in</Link>
      </div>
    </div>
  );
};

export default SignUp;
