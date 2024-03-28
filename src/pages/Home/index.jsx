import './style.css';
import Button from '../../components/Button';
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
    <div className='home'>
      <div className="home-header">
        <h1>
          Discover Amazing Photographers
          <br /> for Every Occasion in Kerala.
        </h1>
        <Button className="book-btn">Book now</Button>
      </div>
      <div className="main">
      <div className='outer-home-main'>
      <div className="home-main">
        {[...images,...images].map(image => {
          return <div className="img-div" style={{backgroundImage:`url(${image})`}}><div className='overlay'><Button>explore</Button></div></div>
        })}
      </div>
      </div>
      </div>
      
    </div>
  );
};

export default Home;
