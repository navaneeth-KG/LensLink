import './style.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams ,useNavigate} from 'react-router-dom';
import { getId, getRole } from '../../../utils';
import Select from './../../../components/Select/index';

const ProfileBook = () => {
  const { id } = useParams();
  const [pg, setPg] = useState({});
  const [state,setState]=useState(false)
  const [service, setService] = useState([]);
  const [book, setBook] = useState({
    photographer: id,
    client: getId(),
    date: '',
    service: '',
  });
  const navigate = useNavigate()


  const fetchPg = async () => {
    const response = await axios.get(
      `http://localhost:4999/photographer/${id}`
    );
    setPg(response.data);
    setService(
      response.data.service.map(item => {
        return { name: item.service.name, value: item.service._id };
      })
    );
  };
  const onChange = (e, key) => {
    setBook({ ...book, [key]: e.target.value });
  };
  const sendReq=async()=>{
    if(getRole=='user'){
    const response = await axios.post(`http://localhost:4999/book`,book)
    alert(response.data.message)
    setState(true)}else{
        alert('login as user to send request')
        navigate('/user/login')
    }

  }
  //   console.log(pg);
  console.log(book);
  useEffect(() => {
    fetchPg();
  }, []);
  return (
    <div className="profile-book">
      <div className="profile-book-pgdetails">
        <h1>{pg.name}</h1>
        <h1>{pg.email}</h1>
        <h1>{pg.portfolio ? pg.portfolio : ''}</h1>
        <ul>
          {service.map(item => {
            return <li>{item.name}</li>;
          })}
        </ul>
      </div>
      <div className="profile-book-container">
        <Select
          placeholder="select service"
          array={service}
          onChange={e => {
            onChange(e, 'service');
          }}
        />
        <label htmlFor="date">chose your date</label>
        <input
          type="date"
          id="date"
          onChange={e => {
            onChange(e, 'date');
          }}
        />
        <button style={{ background: 'blue', color: 'white' }} onClick={sendReq}>
        { state?'request sent':' send request'}
        </button>
      </div>
    </div>
  );
};

export default ProfileBook;
