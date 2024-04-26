import './style.css'

const Input = ({type='text',className,placeholder,onChange,id,value}) => {
  return (
    <input type={type} className={`inp ${className}`} placeholder={placeholder} onChange={onChange} id={id} value={value}/>
  )
}

export default Input
