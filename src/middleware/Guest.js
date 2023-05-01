import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import {getAuthUser} from '../helper/Storage';
const Guest = () => {
    const auth = getAuthUser();
    return (
    <div>
        {
            !auth ? <Outlet /> : <Navigate to={"/"} />
        }
    </div>
  )
};

export default Guest;
