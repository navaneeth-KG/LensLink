import './style.css'

const Input = ({type='text',className,placeholder}) => {
  return (
    <input type={type} className={`inp ${className}`} placeholder={placeholder}/>
  )
}

export default Input
