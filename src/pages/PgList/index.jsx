import axios from '../../utils/axios';
import './style.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Select from '../../components/Select';
import { useNavigate } from 'react-router-dom';

const PgList = () => {
  const [pg, setPg] = useState([]);
  const [places, setplaces] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate()
  const fetchPhotographers = async () => {
    const response = await axios.get(
      `/photographer/service/${id}`
    );
    setPg(response.data);
  };
  const fetchLocations = async () => {
    const response = await axios.get('/location');

    setplaces(
      response.data.map(item => {
        return { name: item.name, value: item._id };
      })
    );
  };

  const fetchPgsByLoc = async e => {
    const response = await axios.get(
      `/photographer/search/${id}/${e.target.value}`
    );
    setPg(response.data)
  };
  useEffect(() => {
    fetchPhotographers();
    fetchLocations();
  }, []);
  return (
    <div className="pg-list">
      <Select
        placeholder="filter by your location"
        className="select"
        array={places}
        onChange={fetchPgsByLoc}
      />
      {pg.map(item => {
        return (
          <div className="card">
            <p>{item.name}</p>
            <p>{item.place.name}</p>
            <p>
              price starting from Rs
              {item.service.map(cat => {
                if (cat.service == id) {
                  return cat.price;
                }
              })}
            </p><p style={{color:'blue'}} onClick={()=>{navigate(`/user/pgprofile/${item._id}`)}}>
                view profile
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PgList;
