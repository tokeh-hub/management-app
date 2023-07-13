import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { showDeleteBoardModal } from '../features/toggle/toggleSlice';
import { setSelectedBoard, getBoards } from '../features/board/boardSlice';

const DeleteBoard = () => {
  const dispatch = useDispatch();
  const { selectedBoard } = useSelector(state => state.board);
  const { dark } = useSelector(state => state.toggle);

  // Function to fetch boards from the server
  const getBoardsF = async () => {
    try {
      const response = await axios.get(`https://mykanban-onpl.onrender.com/boards`);
      dispatch(getBoards(response.data));
      dispatch(setSelectedBoard(response.data[0]));
    } catch (error) {
      // Handle error
    }
  };

  // Function to delete the board
  const deleteBoard = async () => {
    try {
      const response = await axios.delete(`https://mykanban-onpl.onrender.com/boards/${selectedBoard.id}`);
      if (response.status === 200) {
        toast('Board Deleted Successfully');
      } else {
        toast('An Error Occurred');
      }
      getBoardsF();
      closeModal();
    } catch (error) {
      // Handle error
    }
  };

  // Function to close the delete board modal
  const closeModal = () => {
    dispatch(showDeleteBoardModal());
  };

  return (
    <div className='flex flex-col justify-center items-center modal' onClick={() => { closeModal(); }}>
      <div onClick={e => { e.stopPropagation(); }} className={`w-[350px] xs:w-[500px] sm:w-[600px] h-fit rounded-md ${dark ? 'bg-gray-7' : 'bg-white'} p-5 flex font-medium flex-col gap-5 text-slate-500 relative`}>
        <header className='text-red-500 font-medium text-xl'>Delete this board?</header>
        <p className='font-normal text-sm'>Are you sure you want to delete the '{selectedBoard.name}' board? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className='flex flex-col sm:flex-row justify-between gap-4'>
          {/* Button to delete the board */}
          <button onClick={deleteBoard} className='bg-red-500 hover:bg-red-300 text-white basis-1/2 rounded-3xl py-2'>Delete</button>
          {/* Button to cancel and close the modal */}
          <button onClick={closeModal} className='bg-slate-200 hover:bg-indigo-200 basis-1/2 text-purple-1 rounded-3xl py-2'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoard;
