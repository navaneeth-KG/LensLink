import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import './style.css';

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="about">
        <h1>About Us</h1>
        <p>
          Welcome to LensLink Where Stories Find Their Photographers!
          <br /> LensLink was born out of a shared passion for capturing life's
          moments in all their beauty. Our platform is more than just a
          directory; it's a hub where photographers and clients come together to
          create unforgettable stories through the lens. At LensLink, we're
          dedicated to making the process of finding the perfect photographer as
          seamless as possible. From weddings to corporate events, our community
          of talented photographers is here to turn your vision into reality.
          Join us in celebrating the art of photography and the stories waiting
          to be told. Let's embark on this journey together, one snapshot at a
          time.
        </p>

        <h1>Community Impact</h1>
        <p>
          At LensLink, we're bridging the gap between photographers and clients,
          making it easier than ever to find the perfect match. By providing a
          platform where photographers can showcase their talent and clients can
          discover their ideal photographer effortlessly, LensLink is not only
          simplifying the process but also empowering photographers to pursue
          their passion and earn a living doing what they love.
        </p>
        <h1>How Lenslink works</h1>
        <ul>
          <li>
            {' '}
            <span>Browse Photographers</span> : Visitors to LensLink can browse
            through a curated directory of talented photographers, sorted by
            location and specialization
          </li>
          <li>
            {' '}
            <span>Find Your Match</span>: Clients can explore photographers'
            profiles, portfolios, and reviews to find the perfect match for
            their specific needs and preferences.{' '}
          </li>
          <li>
            {' '}
            <span>Request Booking:</span> Once a client finds a photographer
            they like, they can easily request a booking directly through
            LensLink. The photographer will receive the request and can confirm
            availability and details.
          </li>
          <li>
            {' '}
            <span>Capture Moments:</span> On the agreed-upon date, the
            photographer will capture moments, whether it's a wedding, event,
            portrait session, or commercial shoot, ensuring that memories are
            beautifully preserved.
          </li>
          <li>
            <span>Review and Share:</span> After the photography session,
            clients can leave reviews and feedback on the photographer's
            profile, helping future clients make informed decisions. They can
            also share their photos and experiences with friends and family.
          </li>
          <li>
            {' '}
            <span>Grow Together:</span> LensLink fosters a vibrant community
            where photographers and clients can connect, collaborate, and grow
            together. Whether you're a seasoned professional or just starting
            out, LensLink provides the platform and support to thrive in the
            world of photography.
          </li>
        </ul>
        <div className="about-cta">
          <Button
            onClick={() => {
              navigate('/user/book');
            }}
            className="about-btn"
          >
            book a photographer
          </Button>
          <Button
            onClick={() => {
              navigate('/photographer/login');
            }}
            className="about-btn"
          >
            join as photographer
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
