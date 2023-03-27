import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Sidebar from './Components/Sidebar/Sidebar';
import Mykanban from './Components/Pages/Mykanban';
import Signup from './Components/Pages/Signup';
import Login from './Components/Pages/Login';
import Logout from './Components/Pages/Logout';
import RequireAuth from './Components/Auth/Requireauth';
import TaskForm from './Components/Pages/Kanbancomponent/TaskForm'
import Howtouse from './Components/Pages/Kanbancomponent/Howtouse'
import TaskDelete from './Components/Pages/Kanbancomponent/DeleteTask';
import { useDispatch, useSelector } from 'react-redux';
import { deleteActions } from './Components/Store/Reduxstore.js'


import './App.css';


function App() {
  const dispatch = useDispatch();
  const [taskView, setTaskView] = useState(false);
  const [infoView, setInfoView] = useState(false);
  const deleteState = useSelector((state) => state.delete.deleteState)

  const onTaskFormShow = () => {
    setTaskView(true);
  };

  const onTaskFormClose = () => {
    setTaskView(false);
    setInfoView(false);
    dispatch(deleteActions.stateFalse())
  }
  const onViewInfoShow = () => {
    setInfoView(true);
  };



  return (
    <Fragment>
      {taskView && <TaskForm onTaskClose={onTaskFormClose} />}
      {infoView && <Howtouse onTaskClose={onTaskFormClose} />}
      {deleteState && <TaskDelete onTaskClose={onTaskFormClose} />}
      <Router>
        <Sidebar>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path='Home' element={<Home />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/Mykanban" element={<Mykanban onTaskView={onTaskFormShow} onInfoShow={onViewInfoShow} />} />
            </Route>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Logout" element={<Logout />} />
          </Routes>
        </Sidebar>
      </Router>
    </Fragment>
  );
}

export default App;
