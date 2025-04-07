import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/main-layout/MainLayout";
import { PizzasPage } from "../pages/pizzas-page/PizzasPage";
import { LoginPage } from "../pages/login-page/LoginPage";
import { RegisterPage } from "../pages/register-page/RegisterPage";

const router = createBrowserRouter([
    {path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'login'}/>},
            {path: 'pizzas', element: <PizzasPage/>},
            {path: 'register', element: <RegisterPage/>},
            {path: 'login', element: <LoginPage/>}
        ]
}]);

export default router;