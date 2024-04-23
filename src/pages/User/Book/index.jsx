import './style.css';
import Select from '../../../components/Select';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../components/Button';
import { getId } from '../../../utils';
import Input from '../../../components/Input';

const Book = () => {
  const [pgs, setPgs] = useState([]);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [services, setServices] = useState([]);
  const [apps, setApps] = useState([]);

  const [modal, setModal] = useState(false);
  // const [id ,setId]= useState('')
  const [book, setBook] = useState({
    photographer: '',
    client: getId(),
    date: '',
    service: '',
  });

  const [places, setplaces] = useState([]);

  const navigate = useNavigate();
  const fetchData = async () => {
    const response = await axios.get('http://localhost:4999/service');
    setServices(
      response.data.map(item => {
        return { value: item._id, name: item.name };
      })
    );
  };
  const fetchApp = async () => {
    const response = await axios.get(
      `http://localhost:4999/book/user/${getId()}`
    );
    setApps(response.data);
  };
  const fetchLocations = async () => {
    const response = await axios.get('http://localhost:4999/location');
   
    setplaces( response.data.map(item => {
      return { name: item.name, value: item._id };
    }));
  };

  const onViewProfile = id => {
    navigate(`/user/pgprofile/${id}`);
  };

  const onChange = e => {
    setLocation(e.target.value);
    setPgs([]);
  };

  const onChange2 = e => {
    setCategory(e.target.value);
    setPgs([]);
  };
  // const closeModal = () => {
  //   setModal(false);
  // };
  const onReq = (id, name) => {
    console.log(id);
    if (getId()) {
      alert('u can book now');
      setModal(true);
      // setId(id)
      setBook({ ...book, photographer: id, service: category });
      console.log(name);
    } else {
      console.log(getId());
      alert('sign in to book');
      navigate('/user/login');
    }
  };
  const onClick = async () => {
    const response = await axios.get(
      `http://localhost:4999/photographer/search/${category}/${location}`
    );
    setPgs(response.data);
  };
  const onDate = e => {
    setBook({ ...book, date: e.target.value });
  };

  const onBook = async () => {
    const response = await axios.post('http://localhost:4999/book', book);
    console.log(response.data);
    if (response.data) {
      alert('request sent');
    }
    setModal(false);
    onClick();
  };
  console.log(pgs);
  // console.log(location);
  // console.log(category);
  console.log(book);

  useEffect(() => {
    fetchData();
    fetchApp();
    fetchLocations();
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
                {/* <img src="" alt="profile image" /> */}
                <p>name:{item.name}</p>
                <p>place:{item.place.name}</p>
                <p>
                  price:
                  {item.service.map(cat => {
                    if (cat.service == category) {
                      return cat.price;
                    }
                  })}{' '}
                  onwards
                </p>
              </div>
              {modal && (
                <Modal setModal={setModal} onChange={onDate} onClick={onBook} />
              )}

              <div className="right">
                <Button
                  onClick={() => {
                    onReq(item._id, item.name);
                  }}
                >
                  {checkApp(item._id, category, apps) ? 'req sent' : 'send '}
                </Button>
                <p
                  onClick={() => {
                    onViewProfile(item._id);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  view profile
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Book;

const Modal = ({ setModal, onClick, onChange }) => {
  return (
    <div className="modal-contain">
      <p>chose your date</p>

      <h1
        onClick={() => {
          setModal(false);
        }}
        style={{ textAlign: 'right' }}
      >
        X
      </h1>
      <Input type="date" onChange={onChange} />
      <Button className="modal-btn" onClick={onClick}>
        confirm
      </Button>
    </div>
  );
};

const checkApp = (id, service, apps) => {
  try {
    const newResponse = apps.filter(
      app =>
        app.photographer._id == id &&
        app.service._id == service &&
        app.client._id == getId() &&
        (app.status == 'REQUESTED' || app.status == 'ACCEPTED')
    );
    console.log({ hi: newResponse.length });

    if (newResponse.length == 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return false;
  }
};
