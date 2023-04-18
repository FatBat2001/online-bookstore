import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import './styling/dashboard.css'

const Dashboard = () => {

    return (
        <div style={{
            display: "flex"
        }}>
            <Sidebar />
            <div className="p-2">
                {/* <AddForm inputs={bookInputs} title={"Add New Book"} /> */}
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard
