import React from 'react';
import Modal from "../../Modal/Modal";
import classes from "./Howtouse.module.css";
import Button from "react-bootstrap/Button"

const Howtouse = (props) => {

    return (
        <Modal onTaskClose={props.onTaskClose}>
            <h3 className={classes.heading}>How to use</h3>
            <ul>
                <li>Define a new task</li>
                <li>Drag and drop task according to task status</li>
                <li>Drop tasks in delete section to delete task</li>
                <li>Once task has been deleted it can't be retrived</li>
            </ul>
            <Button className={classes.button} onClick={props.onTaskClose}>
                close
            </Button>
        </Modal>
    )
}

export default Howtouse;

