import { jwtDecode } from "jwt-decode";

export const getId = () => {
    const token = localStorage.getItem('token');
    if(!token){
      return null
    }
    const decoded = jwtDecode(token);     
    return decoded.id;
  };