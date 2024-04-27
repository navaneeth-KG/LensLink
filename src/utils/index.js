import { jwtDecode } from "jwt-decode";

export const getId = () => {
    const token = localStorage.getItem('token');
    if(!token){
      return null
    }
    const decoded = jwtDecode(token);     
    return decoded.id;
  };

  export const getRole = () => {
    const token = localStorage.getItem('token');
    if(!token){
      return null
    }
    const decoded = jwtDecode(token);     
    return decoded.role;
  };
 
  export const isTokenValid = () => {
    try {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded && decoded.exp && decoded.exp > currentTime) {
        return true;
      } else false;
    } catch (e) {
      return false;
    }
  };
  
  export const checkRole = role => {
    const token = localStorage.getItem('token');
    try {
      const decoded = jwtDecode(token);
      console.log(decoded, role);
      return role == decoded.role;
    } catch (e) {
      return false;
    }
  };
  