import React, { useState, useEffect } from 'react';
import './style.css';
import { getId } from '../../../utils';
import axios from '../../../utils/axios';

import Button from './../../../components/Button/index';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const fetchApp = async () => {
    const response = await axios.get(
      `/book/user/${getId()}`
    );
    console.log(response.data);
    setBookings(response.data);
  };
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  const onClick = async (id, status) => {
    if (status == 'CANCELLED') {
      await axios.delete(`/book/${id}`);
    }
    await axios.patch(`/book/cancel/${id}`);
    fetchApp();
  };
  console.log(bookings);
  useEffect(() => {
    fetchApp();
  }, []);
  return (
    <div className="user-bookings">
      {bookings.length != 0 ? (
        bookings.map(item => {
          return (
            <div className="app-container">
              <div className="left">
                {' '}
                <p>photographer: {item.photographer.name}</p>
                {/* <p>place: {item.photographer.place.name}</p> */}
                <p>service: {item.service.name}</p>
                <p>booked on: {item.bookingDate ? convert(item.bookingDate) : ''}</p>
                <p>date of shoot:{item.date}</p>
                <p>status: {item.status}</p>
              </div>
              <div className="right">
                <Button
                  onClick={() => {
                    onClick(item._id, item.status);
                  }}
                  className="cancel-btn"
                >
                  {item.status == 'CANCELLED' ? 'delete' : 'cancel'}
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <p style={{ marginTop: '180px' }}>no bookings</p>
      )}
    </div>
  );
};

export default UserBookings;
