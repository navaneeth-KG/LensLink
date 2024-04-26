import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { color } from 'framer-motion';

const imageSlides = [
  {
    url: '/homeImage.jpg',
    description:
      'Explore Exceptional Photographers Perfect Moments, Every Occasion',
  },
  {
    url: '/homeImage2.jpg',
    description:
      "Discover the artistry of photography with LensLink's talented community of photographers",
  },
  {
    url: '/homeImage3.jpg',
    description:
      "Capture life's moments with LensLink – where every click tells a story.",
  },
];

const Home = () => {
  const [categoryImgs, setCategoryImgs] = useState([]);
  const [state, setState] = useState(1);
  const fetchServices = async () => {
    const response = await axios.get('http://localhost:4999/service');
    response.data.slice(0, 7);
    const doubledata = [...response.data, ...response.data];
    setCategoryImgs(doubledata);
  };
  const Navigate = useNavigate();
  const onBook = () => {
    Navigate('/user/book');
  };
  const cta = () => {
    Navigate('/photographer/signup');
  };
  const cta2 = () => {
    Navigate('/user/book');
  };
  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state == 2) {
        setState(0);
      } else {
        setState(state + 1);
      }
    }, 5000);
    return () => setTimeout(timer);
  }, [state]);
  return (
    <div className="home">
      <div
        className="home-header"
        style={{ backgroundImage: `url(${imageSlides[state].url})` }}
      >
        <h1 style={{color:imageSlides[state]==imageSlides[0]?'black':'white'}}>{imageSlides[state].description}</h1>
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
        <h1>explore categories and discover your perfect match</h1>

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
                    <Button
                      onClick={() => {
                        Navigate(`/service/details/${item._id}`);
                      }}
                    >
                      explore
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="cta-section">
        <h1>
          Ready to showcase your talent? Join our community of photographers
          today!
        </h1>
        <Button className="join" onClick={cta}>
          Join as Photographer
        </Button>
      </div>
      <div className="home-about">
        <h1>
          Join our vibrant community today
          and let's turn your moments into timeless memories
        </h1>
        <Button className="join" onClick={cta2}>
          Book a Photographer
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
