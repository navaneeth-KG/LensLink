import './style.css'

const Input = ({type='text',className,placeholder,onChange}) => {
  return (
    <input type={type} className={`inp ${className}`} placeholder={placeholder} onChange={onChange}/>
  )
}

export default Input
