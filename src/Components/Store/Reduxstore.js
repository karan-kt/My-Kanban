//import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';


// const initialAuthState = localStorage.getItem("Login") ? { isAuthenticated: true } : { isAuthenticated: false };
const initialAuthState = { isAuthenticated: null }

const authSlice = createSlice({
    name: 'Authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
})

const initialTaskState = { taskState: false }
const taskSlice = createSlice({
    name: 'TaskHandler',
    initialState: initialTaskState,
    reducers: {
        stateChange(state) {
            state.taskState = !state.taskState;
        }
    }
})

const initialDeleteState = { deleteState: false, deleteID: null }
const deleteSlice = createSlice({
    name: 'DeleteHandler',
    initialState: initialDeleteState,
    reducers: {
        stateTrue(state, actions) {
            state.deleteState = true
            const { id } = actions.payload
            state.deleteID = id
        },
        stateFalse(state) {
            state.deleteState = false
            state.deleteID = null;

        }
    }
})

const store = configureStore({
    reducer: { auth: authSlice.reducer, task: taskSlice.reducer, delete: deleteSlice.reducer }
})

export const authActions = authSlice.actions;
export const taskActions = taskSlice.actions;
export const deleteActions = deleteSlice.actions;

export default store;