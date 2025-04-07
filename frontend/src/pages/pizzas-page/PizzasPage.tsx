import {Pizzas} from "../../components/pizzas/Pizzas";
import {PizzaCreateForm} from "../../components/pizza-create-form/PizzaCreateForm";

export const PizzasPage = () => {
    return (
        <>
            <PizzaCreateForm/>
            <hr/>
            <Pizzas/>
        </>
    )
}