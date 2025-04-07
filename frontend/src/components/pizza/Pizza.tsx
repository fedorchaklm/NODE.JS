import {FC} from "react";
import {IPizza} from "../../interfaces/IPizza";

type PizzaType = {
    pizza: IPizza;
}

export const Pizza: FC<PizzaType> = ({pizza}) => {
    const {name, price, diameter} = pizza;

    return (
        <div>
            <div>name:{name}</div>
            <div>price:{price}</div>
            <div>diameter:{diameter}</div>
        </div>
    );
};

