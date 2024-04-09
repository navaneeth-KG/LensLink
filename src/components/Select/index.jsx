import './style.css';

const Select = ({ array,placeholder,onChange }) => {
  return (
    <select onChange={onChange} className='select'>
        <option disabled selected>{placeholder}</option>
      {array.map(item => {
        return <option value={item.value} key={item.value}>{item.name}</option>;
      })}
    </select>
  );
};

export default Select;
