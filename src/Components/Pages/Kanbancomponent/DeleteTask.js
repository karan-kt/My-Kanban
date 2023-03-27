import React from 'react';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Modal from "../../Modal/Modal";
import { useDispatch, useSelector } from 'react-redux';
import { deleteActions, taskActions } from '../../Store/Reduxstore.js'

const DeleteTask = (props) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.delete.deleteID)
    // console.log(id)
    const confirmDelete = () => {

        Axios.delete(`http://localhost:4000/Mykanban/Delete/${id}`);
        dispatch(deleteActions.stateFalse());
        dispatch(taskActions.stateChange());

    }

    return (
        <Modal onTaskClose={props.onTaskClose}>
            <h4>Are you sure you want to delete this task?</h4>
            <Button variant='danger' onClick={confirmDelete}>DELETE</Button>
        </Modal>
    )
}

export default DeleteTask;



