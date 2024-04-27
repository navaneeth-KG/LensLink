import { isTokenValid } from '../../utils';
import { checkRole } from '../../utils';
import { Navigate, Outlet } from 'react-router-dom';
const PrivateRoute = ({ role, path }) => {
  console.log(isTokenValid(), checkRole(role));
  if (isTokenValid() && checkRole(role)) {
    return <Outlet />;
  } else {
    return <Navigate to={path} />;
  }
};

export default PrivateRoute;