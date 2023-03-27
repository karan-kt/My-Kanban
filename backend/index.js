const express = require('express');
const app = express(); //
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const Model = require('./Schema/UserregistrationData')
const Task = require('./Schema/Taskschema');



app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.Connection_String,
    {
        useNewUrlParser: true,
    });

let token1 = '';
////////////////////////////////////////////////////////////////////
app.post("/Signup", async (request, response) => {
    const Data = {
        Email: request.body.email,
        Password: request.body.password,
        Repassword: request.body.repassword,
    }
    const model = new Model({
        Email: Data.Email,
        Password: Data.Password,
        Retypepassword: Data.Repassword,

    });
    try {
        await model.save();
        // response.send({ token: token });
        response.send("Inserted Data");
    } catch (err) {
        console.log(err);
        response.send(err);
    }
})
//////////////////////////////////////////////////////////////////////////
app.get("/Login", async (request, response) => {
    const jwtSecretKey = "secret";
    const Data = {
        email: request.query.Email,
        password: request.query.Password
    }
    const token = jwt.sign(Data, jwtSecretKey, { expiresIn: "30s" });



    Model.find({ Email: Data.email, Password: Data.password }, (err, result) => {
        if (result.length === 0) {
            response.send("Invalid");
        }
        else {
            response.send(token);
        }
    })

});
/////////////////////////////////////////////////////////////////////
app.get("/Mykanban/Task", async (request, response) => {
    Task.find({}, (err, result) => {
        if (result) {
            response.send(result);
        }
        else {
            response.send(err);
        }
    })
})
/////////////////////////////////////////////////////////////////


app.put("/Mykanban/Update", async (request, response) => {
    const TaskId = request.body.TaskId;
    const NewTaskStep = request.body.NewTaskStep;
    try {
        Task.findById(TaskId, (err, updateTask) => {
            updateTask.TaskStep = NewTaskStep;
            updateTask.save();
            response.send("Update Successfull");

        })
    } catch (err) {
        response.send(err);
    }
});
//////////////////////////////////////////////////////////////////

app.delete('/Mykanban/Delete/:taskId', async (request, response) => {
    const taskId = request.params.taskId;
    await Task.findByIdAndRemove(taskId).exec()
})


//////////////////////////////////////////////////////////////////

app.post("/Mykanban/Newtask", async (request, response) => {
    const taskname = request.body.taskname;
    const taskmain = request.body.taskmain;
    const model = new Task({
        TaskName: taskname,
        TaskMain: taskmain
    })
    try {
        await model.save();
        response.send("Task Saved");
    } catch (err) {
        response.send(err);
        console.log(err);
    }

});

app.get("/Auth", isAuth, async (request, response) => {
    response.send("valid");
})

function isAuth(request, response, next) {
    // const authHeader = request.headers.authorization || request.headers.Authorization;
    const authHeader = request.headers['x-access-token'];
    const Token = authHeader
    console.log(Token)



    jwt.verify(Token, 'secret', function (err, decode) {
        if (err) {
            response.send("error");
        } else {
            return next();
        }
    });
}
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
////Demo Practice/////////////////////////////////////////
app.get("/Gettoken", async (request, response) => {
    const jwtSecretKey = "secret";
    const Data = {
        firstname: "karan",
        lastname: "Turbhekar"
    }
    // , { expiresIn: '20s' }
    // {
    //     headers: {
    //         "x-access-token":
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJrYXJhbiIsImxhc3RuYW1lIjoiVHVyYmhla2FyIiwiaWF0IjoxNjczMTkxNDcwLCJleHAiOjE2NzMxOTIwNzB9._sNAUOuGg5KZZ6zCnhnYNIBcYaVZOvN-InbYKP0Zo58",
    //   },
    // }
    const token = jwt.sign(Data, jwtSecretKey, { expiresIn: "20s" });
    response.send(token);


})

app.get("/Mykanbandemo", isAuth, async (request, response) => {
    Task.find({}, (err, result) => {
        if (result) {
            response.send(result);
        }
    })
})



app.listen(4000, () => console.log("server is running"));
