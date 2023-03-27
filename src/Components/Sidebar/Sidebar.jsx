import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaCreativeCommonsNd,
  FaBars,
  FaClipboard,
} from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";
import { useSelector } from "react-redux";

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     icon: <FaHome />,
//   },
//   {
//     path: "/Signup",
//     name: "Signup",
//     icon: <FaCreativeCommonsNd />,
//   },
//   {
//     path: "/Login",
//     name: "Login",
//     icon: <BiLogInCircle />,
//   },
// ];

// const routes1 = [
//   {
//     path: "/Logout",
//     name: "Logout",
//     icon: <FaHome />,
//   },
// ];

const Sidebar = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const auth = useSelector((state) => state.auth.isAuthenticated);

  // const auth = useSelector((state) => state.auth.isAuthenticated);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div className={classes.maincontainer}>
      <motion.div
        animate={{ width: !toggle ? "200px" : "35px" }}
        className={classes.sidebar}
      >
        <div className={classes.top}>
          {!toggle && <div className={classes.brandname}>The Kanban</div>}
          <div className={classes.menuicon} onClick={toggleHandler}>
            <FaBars />
          </div>
        </div>
        <section className={classes.route}>
          {auth && (
            <NavLink to="/Home" className={classes.nav} key="Home">
              <div className={classes.icon}>
                <FaHome />
              </div>
              {!toggle && <div className={classes.linktext}>Home</div>}
            </NavLink>
          )}
          {auth && (
            <NavLink to="/Mykanban" className={classes.nav} key="Mykanban">
              <div className={classes.icon}>
                <FaClipboard />
              </div>
              {!toggle && <div className={classes.linktext}>Mykanban</div>}
            </NavLink>
          )}
          {!auth && (
            <NavLink to="/Signup" className={classes.nav} key="Signup">
              <div className={classes.icon}>
                <FaCreativeCommonsNd />
              </div>
              {!toggle && <div className={classes.linktext}>Signup</div>}
            </NavLink>
          )}
          {!auth && (
            <NavLink to="/Login" className={classes.nav} key="Login">
              <div className={classes.icon}>
                <BiLogInCircle />
              </div>
              {!toggle && <div className={classes.linktext}>Login</div>}
            </NavLink>
          )}
          {auth && (
            <NavLink to="/Logout" className={classes.nav} key="Logout">
              <div className={classes.icon}>
                <FaCreativeCommonsNd />
              </div>
              {!toggle && <div className={classes.linktext}>Logout</div>}
            </NavLink>
          )}
        </section>
      </motion.div>
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Sidebar;
