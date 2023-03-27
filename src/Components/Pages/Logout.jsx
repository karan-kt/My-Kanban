import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Store/Reduxstore";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  useEffect(() => {
    onLogout();
    navigate("/Login");
    window.location.reload();
    console.clear();
  }, []);
};

export default Logout;
