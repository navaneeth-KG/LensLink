import './style.css'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom';


const CommonSignIn = () => {
    const navigate = useNavigate()
  return (
    <div className='common-sign-in'>
        <Button onClick={()=>{navigate('/photographer/login')}}>Sign in as Photographer</Button>
        <Button onClick={()=>{navigate('/user/login')}}>Sign in as User</Button>      
    </div>
  )
}

export default CommonSignIn
