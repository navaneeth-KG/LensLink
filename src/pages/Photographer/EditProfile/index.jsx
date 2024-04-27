import './style.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from './../../../components/Button/index';


const PgEditProfile = () => {
  const [pg, setPg] = useState({
    name: '',
    portfolio: '',
    contact: '',
    email: '',
    service: [],
  });
  const [services, setServices] = useState([]);
  const [service, setService] = useState({ service: '', price: 0 });
  const { id } = useParams();
  
  const fetchPhotographer = async () => {
    const response = await axios.get(
      `http://localhost:4999/photographer/${id}`
    );
    setPg({ ...response.data, service: [] });
  };
  const fetchServices = async () => {
    const response = await axios.get(`http://localhost:4999/service`);
    setServices(
      response.data.map(item => {
        return { value: item._id, name: item.name };
      })
    );
  };
  const onChange = (e, key) => {
    setPg({ ...pg, [key]: e.target.value });
  };
  const onChange2 = (e, key) => {
    if (key == 'service' && e.target.checked) {
      setService({ ...service, service: e.target.value });
    } else if (key == 'price') {
      setService({ ...service, price: Number(e.target.value) });
    }
  };
  const onClick = () => {
    setPg({ ...pg, service: [...pg.service, service] });
    setService({ service: '', price: '' });
  };
  const onEdit = async () => {
    const response = await axios.patch(
      `http://localhost:4999/photographer/${id}`,
      pg
    );
    alert(response.data.message);
  };
  console.log(pg);
  useEffect(() => {
    fetchPhotographer();
    fetchServices();
  }, []);
  return (
    <div className="pg-edit-profile">
      <div className="left-side">
       
        <div
          style={{backgroundImage:!pg.image?'url(/user.jpg)':`url(${pg.image})`}}
          className="dp-container"
         
        ></div>
        <label htmlFor="dp" style={{fontSize:'12px'}}>change profile picture</label>
        <input type="file" id='dp'  onChange={e => {
            onChange(e, 'image');
          }}/>
        <label htmlFor="name">name</label>
        <input
          id="name"
          type="text"

          value={pg.name}
          onChange={e => {
            onChange(e, 'name');
          }}
          style={{ border: 'none' }}
        />
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="text"
          value={pg.email}
          onChange={e => {
            onChange(e, 'email');
          }}
          style={{ border: 'none' }}
        />
        <label htmlFor="contact">contact</label>
        <input
          id="contact"
          type="text"
          value={pg.contact ? pg.contact : ''}
          onChange={e => {
            onChange(e, 'contact');
          }}
          style={{ border: 'none' }}
        />
        <label htmlFor="portfolio">portfolio link</label>
        <input
          id="portfolio"
          type="text"
          value={pg.portfolio ? pg.portfolio : ''}
          onChange={e => {
            onChange(e, 'portfolio');
          }}
          style={{ border: 'none' }}
        />
      </div>

      <div className="services-select-cont">
        {services.map(item => {
          return (
            <>
              <div className="service-select-card">
                <div>
                  <input
                    type="checkbox"
                    value={item.value}
                    name={item.name}
                    id={item.name}
                    onChange={e => {
                      onChange2(e, 'service');
                    }}
                  />
                  <div className="label">
                    <label htmlFor={item.name}>{item.name}</label>
                  </div>
                </div>
                <input
                  type="number"
                  placeholder="enter price"
                  onChange={e => {
                    onChange2(e, 'price');
                  }}
                  style={{ height: '30px' }}
                />
                <button
                  onClick={onClick}
                  style={{ color: 'red', width: '50px', height: '30px' }}
                >
                  add
                </button>
              </div>
            </>
          );
        })}
      </div>
      <Button onClick={onEdit}>EDIT</Button>
    </div>
  );
};

export default PgEditProfile;
