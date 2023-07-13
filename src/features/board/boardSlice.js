import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: false,
  chatSidebar: false,
  auth: false,
  selectedBoard: {},
  currentTask: {},
  currentSubTask: {},
  boards: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setSelectedBoard: (state, action) => {
      state.selectedBoard = action.payload;
    },
    setSelectedTask: (state, action) => {
      state.currentTask = action.payload;
    },
    setSelectedSubTask: (state, action) => {
      state.currentSubTask = action.payload;
    },
    menuToggle: (state) => {
      state.menu = !state.menu;
    },
    chatSidebarToggle: (state) => {
      state.chatSidebar = !state.chatSidebar;
    },
    getBoards: (state, action) => {
      state.boards = action.payload;
    },
  },
});

export const {
  menuToggle,
  chatSidebarToggle,
  setSelectedSubTask,
  setSelectedBoard,
  setSelectedTask,
  getBoards,
} = boardSlice.actions;

export default boardSlice.reducer;
