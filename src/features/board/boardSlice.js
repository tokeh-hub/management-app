import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: false,
    chatSidebar: false,
    auth: false,
    selectedBoard: {},
    currentTask: {},
    currentSubTask: {},
    boards: []
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setSelectedBoard: (state,{payload}) => {
            state.selectedBoard = {...state,selectedBoard:payload};
        },
        setSelectedTask: (state,{payload}) => {
            state.currentTask = {...state,currentTask:payload};
        },
        setSelectedSubTask: (state,{payload}) => {
            state.currentSubTask = {...state,currentSubTask:payload};
        },
        menuToggle: (state) => {
            state.menu = !state.menu;
        },
        chatSidebarToggle: (state) => {
            state.chatSidebar = !state.chatSidebar;
        },

        getBoards:  (state,{payload}) =>{
                state.boards = {...state,boards:payload}
        }
    },
});

export const { menuToggle, chatSidebarToggle,setSelectedSubTask,setAuthState,setSelectedBoard,setSelectedTask,getBoards } = boardSlice.actions;
export default boardSlice.reducer;
