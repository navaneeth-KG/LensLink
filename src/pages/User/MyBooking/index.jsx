import React, { useState,useEffect } from 'react'
import './style.css'
import { getId } from '../../../utils'
import axios from 'axios'

const UserBookings = () => {

    const [bookings,setBookings]=useState([])
    const fetchApp=async()=>{
        const response =await axios.get(`http://localhost:4999/book/user/${getId()}`)
        console.log(response.data);
        setBookings(response.data)
    }
    useEffect(()=>{fetchApp()},[])
  return (
    <div className='user-bookings'>

        {bookings.map(item=>{
            return(
                <div className="app-container">
                    <p>{item.photographer.name}</p>
                    <p>{item.photographer.place}</p>
                    <p>{item.service.name}</p>
                    <p>{item.status}</p>




                </div>
            )
        })}


      
    </div>
  )
}

export default UserBookings
