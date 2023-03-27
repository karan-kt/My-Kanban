import React, { useState } from 'react';
// import Card from "../../UI/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from "./TaskForm.module.css";
import Axios from 'axios';
import Modal from "../../Modal/Modal";
import { useDispatch } from 'react-redux';
import { taskActions } from '../../Store/Reduxstore.js'

const TaskForm = (props) => {
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState("");
    const [taskMain, setTaskMain] = useState("");


    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            await Axios.post("http://localhost:4000/Mykanban/Newtask", {
                taskname: taskName,
                taskmain: taskMain
            })
        } catch (err) {
            console.log(err?.response);
        }
        console.log(taskName, taskMain);

        setTaskName("");
        setTaskMain("");
        dispatch(taskActions.stateChange());
    }


    return (
        <Modal onTaskClose={props.onTaskClose}>
            <div className={classes.main}>
                <h6>Add New Task</h6>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3" controlId="TaskName">
                        <Form.Label>TaskName</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="TaskName"
                            onChange={({ target }) => setTaskName(target.value)}
                            value={taskName}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="TaskMain">
                        <Form.Label>Add Task</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Specify the task"
                            onChange={({ target }) => setTaskMain(target.value)}
                            value={taskMain}>
                        </Form.Control>
                    </Form.Group>
                    <div className={classes.buttons}>
                        <Button className={classes.button} type="submit">
                            Add Task
                        </Button>
                        <Button className={classes.button} onClick={props.onTaskClose}>
                            Close
                        </Button>
                    </div>
                </Form>
            </div >
        </Modal>
    )
}

export default TaskForm;



