import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showDeleteTaskModal } from '../features/toggle/toggleSlice';
import { setSelectedBoard, getBoards } from '../features/board/boardSlice';

const DeleteTask = () => {
  const dispatch = useDispatch();
  const { selectedBoard } = useSelector(state => state.board);
  const { dark } = useSelector(state => state.toggle);
  const { currentTask } = useSelector(state => state.board);
  const [columns, setColumns] = useState(selectedBoard?.columns);
  let copiedColumns = [];
  let copiedTasks = [];

  // Function to fetch boards from the server
  const getBoardsF = async () => {
    try {
      const response = await axios.get(`https://mykanban-onpl.onrender.com/boards`);
      dispatch(getBoards(response.data));
      dispatch(setSelectedBoard(response.data[selectedBoard.id - 1]));
    } catch (error) {
      // Handle error
    }
  };

  // Function to delete the task
  const deleteTask = async () => {
    columns.forEach((col, index) => {
      if (col.name === currentTask.status) {
        copiedTasks = col.tasks.filter(task => task.id !== currentTask.id);
        const updated = { ...col, tasks: copiedTasks };
        copiedColumns = columns.slice();
        copiedColumns[index] = updated;
        setColumns(copiedColumns);
      }
    });

    try {
      await axios.patch(`https://mykanban-onpl.onrender.com/boards/${selectedBoard.id}`, {
        columns: copiedColumns
      });

      getBoardsF();
      closeModal();
    } catch (error) {
      // Handle error
    }
  };

  // Function to close the delete task modal
  const closeModal = () => {
    dispatch(showDeleteTaskModal());
  };

  return (
    <div className='flex flex-col justify-center items-center modal' onClick={() => { closeModal(); }}>
      <div onClick={e => { e.stopPropagation(); }} className={`w-[300px] xs:w-[500px] sm:w-[600px] h-fit rounded-md ${dark ? 'bg-gray-7' : 'bg-white'} p-5 flex font-medium flex-col gap-5 text-slate-500 relative`}>
        <header className='text-red-500 font-medium text-xl'>Delete this Task?</header>
        <p className='font-normal text-sm'>Are you sure you want to delete the '{currentTask.title}' task and its subtasks? This cannot be reversed.</p>
        <div className='flex flex-col sm:flex-row justify-between gap-4'>
          {/* Button to delete the task */}
          <button onClick={deleteTask} className='bg-red-500 hover:bg-red-300 text-white basis-1/2 rounded-3xl py-2'>Delete</button>
          {/* Button to cancel and close the modal */}
          <button onClick={closeModal} className='bg-slate-200 hover:bg-indigo-200 basis-1/2 text-purple-1 rounded-3xl py-2'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
