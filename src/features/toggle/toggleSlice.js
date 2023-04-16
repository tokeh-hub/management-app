import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dark: false,
    hideSidebar:false,
    addBoardModal:false,
    taskDetailModal:false,
    editBoardModal:false,
    editTaskModal:false,
    deleteBoardModal:false,
    deleteTaskModal:false,
    addColumnModal: false,
    addTaskModal: false,
    boardActions: false,
    taskActions: false,
    showBoards: false,
};


export const toggleSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        backgroundToggle: (state) => {
            state.dark = !state.dark;
        },
        sidebarToggle: (state) => {
            state.hideSidebar = !state.hideSidebar;
        },
        showAddBoardModal: (state) => {
            state.addBoardModal = !state.addBoardModal;
        },
        showTaskDetailModal: (state) => {
            state.taskDetailModal = !state.taskDetailModal;
        },
        showEditBoardModal: (state) => {
            state.editBoardModal = !state.editBoardModal;
        },
        showDeleteBoardModal: (state) => {
            state.deleteBoardModal = !state.deleteBoardModal;
        },
        showEditTaskModal: (state) => {
            state.editTaskModal = !state.editTaskModal;
        },
        showDeleteTaskModal: (state) => {
            state.deleteTaskModal = !state.deleteTaskModal;
        },
        showAddColumnModal: (state) => {
            state.addColumnModal = !state.addColumnModal;
        },
        showAddTaskModal: (state) => {
            state.addTaskModal = !state.addTaskModal;
        },
        showBoardActions: (state) => {
            state.boardActions = !state.boardActions;
        },
        showTaskActions: (state) => {
            state.taskActions = !state.taskActions;
        },
        showAvailableBoards: (state) => {
            state.showBoards = !state.showBoards;
        }
    }
});

export const {showAvailableBoards,backgroundToggle,showDeleteTaskModal,showEditTaskModal,sidebarToggle,showTaskActions,showBoardActions,showAddColumnModal,showAddTaskModal,showAddBoardModal,showDeleteBoardModal,showTaskDetailModal,showEditBoardModal} = toggleSlice.actions;
export default toggleSlice.reducer;
