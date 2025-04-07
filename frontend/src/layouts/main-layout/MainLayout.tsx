import { Outlet } from "react-router-dom";
import {Header} from "../../components/header/Header";

const MainLayout = () => {
    return (
        <div>
            <Header/>
            Main Layout
            <Outlet/>
        </div>
    )
}

export default MainLayout;