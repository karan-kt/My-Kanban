import React, { Fragment } from "react";
import classes from "./Modal.module.css"

const Mainmodal = (props) => {
    return (<div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>)
}

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onTaskClose}>

    </div>
}

const Modal = (props) => {
    return (
        <Fragment>
            <Backdrop onTaskClose={props.onTaskClose} />
            <Mainmodal>{props.children}</Mainmodal>
        </Fragment>
    )

}

export default Modal;