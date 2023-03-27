import React, { useState, useEffect, Fragment } from "react";
import classes from "./Mykanban.module.css";
import Axios from "axios";
import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import Dropablekanban from "./Kanbancomponent/Dropablekanban";
import Card from "../UI/Card";
import { useSelector } from "react-redux";

const Mykanban = (props) => {
  // const navigate = useNavigate();
  const taskState = useSelector((state) => state.task.taskState);
  const [itemList, updateItemList] = useState([]);
  const [itemList2, updateItemList2] = useState([]);
  const [itemList3, updateItemList3] = useState([]);
  // const deleteList = [];
  // const Token = JSON.parse(localStorage.getItem("Token"));

  const fetchTasks = async () => {
    await Axios.get(
      "http://localhost:4000/Mykanban/Task"
      // , {
      //   headers: {
      //     "x-access-token": Token,
      //   },
      // }
    )
      .then((response) => {
        const Task = [];
        const Task2 = [];
        const Task3 = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].TaskStep === "Droppable1") {
            Task.push({
              Key: response.data[i]._id,
              TaskName: response.data[i].TaskName,
              TaskMain: response.data[i].TaskMain,
              TaskStep: response.data[i].TaskStep,
            });
          }
          if (response.data[i].TaskStep === "Droppable2") {
            Task2.push({
              Key: response.data[i]._id,
              TaskName: response.data[i].TaskName,
              TaskMain: response.data[i].TaskMain,
              TaskStep: response.data[i].TaskStep,
            });
          }
          if (response.data[i].TaskStep === "Droppable3") {
            Task3.push({
              Key: response.data[i]._id,
              TaskName: response.data[i].TaskName,
              TaskMain: response.data[i].TaskMain,
              TaskStep: response.data[i].TaskStep,
            });
          }
          // if (response.data === "error") {
          //   console.log(response.data);
          //   navigate("/Logout");
          //   setSession(false);
          // }
        }
        updateItemList(Task);
        updateItemList2(Task2);
        updateItemList3(Task3);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchTasks();
  }, [taskState]);

  const onDragHandler = (result) => {
    if (!result.destination) {
      return;
    }

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    let add;
    let active = itemList;
    let active2 = itemList2;
    let active3 = itemList3;
    // Source Logic
    if (result.source.droppableId === "Droppable1") {
      add = active[result.source.index];
      active.splice(result.source.index, 1);
    }
    if (result.source.droppableId === "Droppable2") {
      add = active2[result.source.index];
      active2.splice(result.source.index, 1);
    }
    if (result.source.droppableId === "Droppable3") {
      add = active3[result.source.index];
      active3.splice(result.source.index, 1);
    }

    // Destination Logic
    if (result.destination.droppableId === "Droppable1") {
      active.splice(result.destination.index, 0, add);
    }
    if (result.destination.droppableId === "Droppable2") {
      active2.splice(result.destination.index, 0, add);
    }
    if (result.destination.droppableId === "Droppable3") {
      active3.splice(result.destination.index, 0, add);
    }

    const updateTask = () => {
      Axios.put("http://localhost:4000/Mykanban/Update", {
        TaskId: result.draggableId,
        NewTaskStep: result.destination.droppableId,
      });
    };

    // const deleteTask = (Id) => {
    //   Axios.delete(`http://localhost:4000/Mykanban/Delete/${Id}`);
    // };

    // if (result.destination.droppableId === "Delete") {
    //   deleteTask(result.draggableId);
    // } else {
    //   updateTask();
    updateTask();

    updateItemList(active);
    updateItemList2(active2);
    updateItemList3(active3);
    console.log(result.draggableId);
    console.log(result.destination.droppableId);
  };

  return (
    <Fragment>
      <div className={classes.buttons}>
        <Button className={classes.button} onClick={props.onInfoShow}>
          How it works
        </Button>
        <Button className={classes.button} onClick={props.onTaskView}>
          Add Task
        </Button>
      </div>
      <main className={classes.main}>
        <DragDropContext onDragEnd={onDragHandler}>
          <Card className={classes.card}>
            <div>
              <h3 className={classes.heading}>Assigned Tasks</h3>
              <Dropablekanban list={itemList} Id="Droppable1" />
            </div>
          </Card>

          <Card>
            <h3 className={classes.heading}>Ongoing Task</h3>
            <Dropablekanban list={itemList2} Id="Droppable2" />
          </Card>

          <Card>
            <h3 className={classes.heading}>Finished Task</h3>
            <Dropablekanban list={itemList3} Id="Droppable3" />
          </Card>

          {/* <Card>
            <h3 className={classes.heading}>Delete Task</h3>
            <Dropablekanban list={deleteList} Id="Delete" />
          </Card> */}
        </DragDropContext>
      </main>
    </Fragment>
  );
};

export default Mykanban;
