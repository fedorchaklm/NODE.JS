import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {authService} from "../../services/auth.service";
import {authSliceActions} from "../../redux/slices/authSlice";
import './Header.css';
import {Link} from "react-router-dom";

export const Header = () => {
    const {me} = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();

    if (authService.getAccessToken() && !me) {
        dispatch(authSliceActions.me());
    }

    return (
        <div className={'header'}>
            {
                me ?
                    <img style={{width: "50px", height: "30px"}} src={`${process.env.REACT_APP_BASE_URL}/${me.avatar}`}
                         alt={`${me.name}`}></img>
                    :
                    <div>
                        <Link to={'login'}>Login</Link>
                        <Link to={'register'}>Register</Link>
                    </div>
            }
        </div>
    );
};

