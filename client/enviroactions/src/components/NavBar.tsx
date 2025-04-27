import React from "react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
    const navigate = useNavigate();

    const returnhome = () => {
        navigate("/");
    }; 
    const returnAccount = () => {
        navigate("/home");
    };

    return (
        <div>
            <button onClick={returnhome}>Landing page</button>
            <button onClick={returnAccount}>Account menu</button>
        </div>



    );
}