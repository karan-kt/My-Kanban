import React from "react";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className={classes.Imgdiv}>
      {/* <img className={classes.Image} src={Homeimg} /> */}
      <center>
        <h3 className={classes.title}>Your Personal Kanban</h3>
      </center>
    </div>
  );
};

export default Home;
