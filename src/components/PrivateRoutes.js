import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Mainpage from './Mainpage';
import { useEffect ,useState} from 'react';
import LoadingSpinner from './LoadingScreen';
const PrivateRoutes = ({ props }) => {
    const token = useSelector((state) => state.user.token);
    const userid = useSelector((state) => state.user.userID);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); 
    }, []);
  
    return (
        token!=null ? <Mainpage /> :
      isLoading ? (
        <div style={{display:'flex',width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}><LoadingSpinner /></div>
      ) : (
        token!=null ? (
          <Mainpage />
        ) : (
          <Navigate to="/" replace />
        )
      )
    );
  };

  export default PrivateRoutes;
  