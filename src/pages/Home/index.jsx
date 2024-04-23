import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

const images = [
  '/baby.jpg',
  '/prewedding.jpg',
  '/wedding.jpg',
  '/studio.jpg',
  '/video.jpg',
  '/product.jpg',
  '/frame.jpg',
];



const Home = () => {

  const [categoryImgs,setCategoryImgs]=useState([])
  const fetchServices=async()=>{
    const response= await axios.get('http://localhost:4999/service')
    response.data.slice(0,7)
    const doubledata=[...response.data,...response.data]
    setCategoryImgs(doubledata)
  
  }
  const Navigate = useNavigate();
  const onBook = () => {
    Navigate('/user/book');
  };
  const cta=()=>{
    Navigate('/photographer/signup')
  }
  const cta2=()=>{
    Navigate('/user/book')
  }
  useEffect(()=>{fetchServices()},[])
  return (
    <div className="home">
      <div className="home-header">
        <h1>
          Discover Amazing Photographers
          <br /> for Every Occasion in Kerala.
        </h1>
        <Button className="book-btn" onClick={onBook}>
          Book now
        </Button>
      </div>

      <div className="home-main">
        {/* <div className="search-container">
          <Input
            className="search-input"
            placeholder="find photographers by location"
          />
          <Button className="search-btn">search</Button>
        </div> */}

        <div className="slider-container">
          <div className="slider">
            {categoryImgs.map((item, idx) => {
              return (
                <div
                  className="img-div"
                  key={idx}
                  style={{ backgroundImage: `url(${item.image})` }}
                  
                >
                  <div className="overlay">
                    <Button onClick={()=>{Navigate(`/service/details/${item._id}`)}}>explore</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="cta-section">
        <h1>
          Ready to Showcase Your Talent? Join Our Community of Photographers
          Today!
        </h1>
        <Button className="join" onClick={cta}>Join as Photographer</Button>
      </div>
      <div className="home-about">
        <p>
          Discover exceptional photographers for every occasion. From weddings
          to commercial shoots, our platform connects you with top-tier talent
          ready to capture your unique story. Join our vibrant community today
          and let's turn your moments into timeless memories
        </p>
        <Button className="join" onClick={cta2}>Book a Photographer</Button>
      </div>
      <Footer/>


    </div>
  );
};

export default Home;
