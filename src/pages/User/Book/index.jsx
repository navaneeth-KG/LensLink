import './style.css';
import Select from '../../../components/Select';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../components/Button';
import { getId } from '../../../utils';


const Book = () => {
  const [pgs, setPgs] = useState([]);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [services, setServices] = useState([]);

  const [places, setplaces] = useState([
    { name: 'kasargod', value: 'kasargod' },
    { name: 'kannur', value: 'kannur' },
    { name: 'wayanad', value: 'wayanad' },
    { name: 'kozhikod', value: 'kozhikod' },
    { name: 'palakkad', value: 'palakkad' },
    { name: 'thrissur', value: 'thrissur' },
    { name: 'ernakulam', value: 'ernakulam' },
  ]);

  const navigate = useNavigate()
  const fetchData = async () => {
    const response = await axios.get('http://localhost:4999/service');
    setServices(
      response.data.map(item => {
        return { value: item._id, name: item.name };
      })
    );
  };
  const onViewProfile=(id)=>{
    navigate(`/user/pgprofile/${id}`)
  }

  const onChange = e => {
    setLocation(e.target.value);
    setPgs([]);
  };

  const onChange2 = e => {
    setCategory(e.target.value);
    setPgs([]);
  };
 const onReq=(id)=>{
  if(getId()){
    alert('u can book now');
  }else{
    console.log(getId());
    alert('sign in to book');
    navigate('/user/login')
  }

 }
  const onClick = async () => {
    const response = await axios.get(
      `http://localhost:4999/photographer/search/${category}/${location}`
    );
    setPgs(response.data);
  };

  console.log(pgs);
  console.log(location);
  console.log(category);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="book">
      <Select
        array={services}
        placeholder="choose category"
        onChange={onChange2}
      />
      <Select array={places} placeholder="choose place" onChange={onChange} />
      <Button onClick={onClick}>search</Button>

      <div className="pg-card-container">
        {pgs.map(item => {
          return (
            <div className="pg-card">
              <div className="left">
                <img src="" alt="profile image" />
                <p>name:{item.name}</p>
                <p>place:{item.place}</p>
                <p>
                  price:
                  {item.service.map(cat => {
                    if (cat.service == category) {
                      return cat.price;
                    }
                  })}
                </p>
              </div>

              <div className="right">
                <Button onClick={()=>{onReq(item._id)}}>send request</Button>
                <p onClick={()=>{onViewProfile(item._id)}}>view profile</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Book;
