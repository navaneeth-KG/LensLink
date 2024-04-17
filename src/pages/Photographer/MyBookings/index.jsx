import { useEffect, useState } from 'react';
import { getId } from '../../../utils';
import './style.css';
import axios from 'axios';

const PgBooking = () => {
  const [apps, setApps] = useState([]);

  const fetchApps = async () => {
    const response = await axios.get(`http://localhost:4999/book/${getId()}`);
    setApps(response.data);
  };
  const onConfirm = async (id, status) => {
    if (status == 'REQUESTED'|| status=='CANCELLED') {
      const response = await axios.patch(`http://localhost:4999/book/${id}`);
      alert(response.data.message);
      fetchApps();
    } else if (status == 'ACCEPTED') {
      const response = await axios.patch(
        `http://localhost:4999/book/cancel/${id}`
      );
      alert(response.data.message);
      fetchApps();
    }
  };

  const onAppDel=async(id)=>{
    const response = await axios.delete(`http://localhost:4999/book/${id}`);
    alert(response.data.message);
     fetchApps()
  }
  console.log(apps);
  useEffect(() => {
    fetchApps();
  }, []);
  return (
    <div className="pg-booking">
      {apps.length != 0 ? (
        apps.map(item => {
          return (
            <div className="app-card">
              <p>{item.client.name}</p>
              <p>{item.client.contact}</p>
              <p>{item.date}</p>
              <p>{item.service.name}</p>
              <h2>status {item.status}</h2>
              <button
                onClick={() => {
                  onConfirm(item._id, item.status);
                }}
              >
                {item.status == 'ACCEPTED' ? 'cancel' : 'confirm'}
              </button>
              {item.status=='CANCELLED'&&<button onClick={()=>{onAppDel(item._id)}}>delete</button>}
            </div>
          );
        })
      ) : (
        <p style={{ margin: '0 auto' }}>no bookings</p>
      )}
    </div>
  );
};

export default PgBooking;
