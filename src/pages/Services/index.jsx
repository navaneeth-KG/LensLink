import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const fetchServices = async () => {
    const response = await axios.get('http://localhost:4999/service');
    setServices(response.data);
  };
  const onClick = id => {
    navigate(`/service/details/${id}`);
  };
  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <>
      {services.length != 0 ? (
        <div className="service">
          <h1>
            Explore a world of photography possibilities tailored just for you,
            with LensLink's diverse range of services.
          </h1>
          <h2>services we offer</h2>
          <div className="services-container">
            {services.map(item => {
              return (
                <div
                  className="services-image"
                  onClick={() => {
                    onClick(item._id);
                  }}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <p className="services-name">{item.name}</p>
                </div>
              );
            })}
          </div>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Services;
