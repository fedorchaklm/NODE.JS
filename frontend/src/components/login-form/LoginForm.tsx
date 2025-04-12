import {useForm} from "react-hook-form";
import {IAuth} from "../../interfaces/IAuth";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {authSliceActions} from "../../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";

export const LoginForm = () => {
    const {register, handleSubmit} = useForm<IAuth>();
    const {errors} = useAppSelector((state) => state.authSlice);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // const customSubmit = (user: IAuth) => {
    //     dispatch(authSliceActions.login({user}));
    //     navigate("/pizzas");
    // }

    const customSubmit = async (user: IAuth) => {
        console.log(user);
        const {meta: {requestStatus}} = await dispatch(authSliceActions.login({user}));
        console.log(requestStatus);
        if (requestStatus === 'fulfilled') {
            navigate('/pizzas')
        }
    }

    return (
        <form onSubmit={handleSubmit(customSubmit)}>
            <label htmlFor="email">Enter your email</label>
            <input id="email" type='text' {...register("email")}/>
            <label htmlFor="password">Enter your password</label>
            <input id="password" type='text' {...register("password")}/>
            <button type="submit">Login</button>
            {errors && <div>Username or password incorrect</div>}
        </form>
    )
}