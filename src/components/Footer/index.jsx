import React from 'react';
import './style.css'

const Footer = () => {
  return (
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
      <p className="copyright">© 2024 LensLink</p>
    </div>
  );
};

export default Footer;
