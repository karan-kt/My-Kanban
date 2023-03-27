import React from 'react';
import classes from './Dropablekanban.module.css';
import './List.css';

import { FaTrashAlt } from "react-icons/fa";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from 'react-redux';
import { deleteActions } from '../../Store/Reduxstore.js'

const Dropablekanban = (props) => {
    const dispatch = useDispatch();

    const deleteTask = (e) => {
        const id = e.target.id;
        dispatch(deleteActions.stateTrue({ id }))


        console.log(e.target.id);
    };

    return (
        <div className={classes.container}>
            <Droppable droppableId={props.Id}>
                {(provided) => (
                    <ul
                        className={classes.mainbody}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {props.list.map(({ Key, TaskMain, TaskName, TaskStep }, index) => {
                            return (
                                <Draggable key={Key} draggableId={Key} index={index}>
                                    {(provided) => (
                                        <li
                                            className={props.Id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >

                                            <p className={classes.id}>{TaskName}</p>
                                            <p className={classes.main}>{TaskMain}</p>
                                            <div className={classes.delete} onClick={deleteTask} id={Key}><FaTrashAlt /></div>


                                        </li>
                                    )
                                    }
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </div >
    )
}

export default Dropablekanban;