import './style.css';

const Button = ({ className, onClick, children }) => {
  return <button className={`btn ${className}`}>{children}</button>;
};

export default Button;
