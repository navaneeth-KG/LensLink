import Input from '../../components/Input';
import Button from '../../components/Button';
import './style.css';
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
  return (
    <div className="home">
      <div className="home-header">
        <h1>
          Discover Amazing Photographers
          <br /> for Every Occasion in Kerala.
        </h1>
        <Button className="book-btn">Book now</Button>
      </div>

      <div className="home-main">
        <div className="search-container">
          <Input
            className="search-input"
            placeholder="find photographers by location"
          />
          <Button className="search-btn">search</Button>
        </div>

        <div className="slider-container">
          <div className="slider">
            {[...images, ...images].map((image, idx) => {
              return (
                <div
                  className="img-div"
                  key={idx}
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <div className="overlay">
                    <Button>explore</Button>
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
        <Button className="join">Join as Photographer</Button>
      </div>
      <div className="home-about">
        <p>
          Discover exceptional photographers for every occasion. From weddings
          to commercial shoots, our platform connects you with top-tier talent
          ready to capture your unique story. Join our vibrant community today
          and let's turn your moments into timeless memories
        </p>
        <Button className="join">Book a Photographer</Button>
      </div>

      <div className="footer">
        {/* <i className="fa-brands fa-square-facebook" ></i>
      <i className="fa-brands fa-square-instagram" ></i>
      <i className="fa-brands fa-square-x-twitter" ></i> */}

        <h2>follow us on</h2>

        <div className="social-icons">
          {' '}
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook-f"></i>
          <i className="fa-brands fa-x-twitter"></i>
        </div>

        <div className="options">
          <p>report an issue</p>
          <p>about us</p>
          <p>sservices</p>
        </div>
        <p className='copyright'>© 2024 LensLink</p>
      </div>
    </div>
  );
};

export default Home;
