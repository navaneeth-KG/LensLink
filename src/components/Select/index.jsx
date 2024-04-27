import './style.css';

const Select = ({ array,placeholder,onChange,className}) => {
  return (
    <select onChange={onChange} className={`select ${className}`}>

      <option disabled selected>{placeholder}</option>
      {array.map(item => {
        return <option value={item.value} key={item.value}>{item.name}</option>;
      })}
    </select>
  );
};

export default Select;
