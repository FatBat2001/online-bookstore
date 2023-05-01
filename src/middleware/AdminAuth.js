import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import {getAuthUser} from '../helper/Storage';
const AdminAuth = () => {
    const auth = getAuthUser();
    return (
    <div>
        {
            auth && auth.type === 'librarian'? <Outlet /> : <Navigate to={"/"} />
        }
    </div>
  )
};

export default AdminAuth;
