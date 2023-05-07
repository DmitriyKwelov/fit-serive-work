import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Navigate, Outlet} from "react-router-dom";

const AdminRoute = () => {
    const {isAuth, user} = useSelector((state: RootState) => state.auth)
    return (
        isAuth && user!.role === 'admin' ? <Outlet/> : <Navigate to="/login"/>
    );
};

export default AdminRoute;