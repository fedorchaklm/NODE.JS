import {useAppDispatch, useAppSelector} from "../../redux/hooks/reduxHooks";
import {useEffect} from "react";
import {pizzaSliceActions} from "../../redux/slices/pizzasSlice";
import {Pizza} from "../pizza/Pizza";

export const Pizzas = () => {
    const {pizzas, trigger} = useAppSelector(state => state.pizzaSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(pizzaSliceActions.getAll());
    }, [trigger]);

    return (
        <div>
            {pizzas.map(pizza => <Pizza key={pizza._id} pizza={pizza} />)}
        </div>
    );
};

