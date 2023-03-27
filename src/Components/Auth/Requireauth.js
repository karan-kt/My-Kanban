import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Store/Reduxstore";



const RequireAuth = () => {
    const checkState = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const location = useLocation()
    const Token = JSON.parse(localStorage.getItem("Token"));

    const check = async () => {
        await Axios.get("http://localhost:4000/Auth", {

            headers: {
                "x-access-token": Token,
            },
        }).then(response => {
            if (response.data === "valid") {
                console.log(response.data);
                dispatch(authActions.login())
            } else {
                dispatch(authActions.logout())

            }



        })
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            check();
        }, 2000)
        return () => clearTimeout(timer);
    }, [checkState, Token])
    const Check = localStorage.getItem("Valid");

    if (checkState === true) {
        return <Outlet />
    }

    if (checkState === false) {
        return <Navigate to="/Logout" />
    }


}


export default RequireAuth