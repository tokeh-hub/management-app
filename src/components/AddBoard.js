// Import necessary dependencies
import axios from 'axios';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { showAddBoardModal } from '../features/toggle/toggleSlice';
import { setSelectedBoard, getBoards } from '../features/board/boardSlice';
import { toast } from 'react-toastify';
import { SketchPicker } from 'react-color';

const AddBoard = () => {
  // Define state variables
  const dispatch = useDispatch();
  const { dark } = useSelector((state) => state.toggle);
  const [boardName, setBoardName] = useState('');
  const [columns, setColumns] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [columnName, setColumnName] = useState('');
  const [color, setColor] = useState('#635FC7');
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Close the board modal
  const closeBoardModal = () => {
    dispatch(showAddBoardModal());
  };

  // Add a new column to the columns state
  const addToColumns = () => {
    const column = {
      id: columns.length + 1,
      color: color,
      name: columnName,
      tasks: [],
    };
    setColumns([...columns, column]);
    setShowInput(false);
    setShowColorPicker(false);
    setColumnName('');
  };

  // Delete a column from the columns state
  const deleteColumn = (deleteId) => {
    const filtered = columns.filter((col) => col.id !== deleteId);
    setColumns(filtered);
  };

  // Fetch boards from the server
  const getBoardsF = async () => {
    const response = await axios.get(`https://mykanban-onpl.onrender.com/boards`);
    dispatch(getBoards(response.data));
    dispatch(setSelectedBoard(response.data[response.data.length - 1]));
  };

  // Add a new board
  const addBoard = async () => {
    try {
      // eslint-disable-next-line
      const response = await axios.post('https://mykanban-onpl.onrender.com/boards', {
        name: boardName,
        columns: columns,
      });
      toast('Board Added!');
      getBoardsF();
      closeBoardModal();
    } catch (error) {
      // Handle error
    }
  };

  // Render AddBoard component
  return (
    <div className='flex flex-col justify-center items-center modal' onClick={() => closeBoardModal()}>
      <div
        onClick={(e) => {
          // Do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
        className={`w-[300px] xs:w-[500px] sm:w-[600px] h-fit rounded-md ${
          dark ? 'bg-gray-7 text-white' : 'bg-white text-slate-500'
        } p-5 flex flex-col gap-5 relative`}
      >
        <header className={`${dark ? 'text-white' : 'text-black'} font-bold`}>Add New Board</header>
        <div>
          <label className='text-sm font-medium'>Name</label>
          <input
            type='text'
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder='e.g Platform Board'
            className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${
              dark ? 'bg-transparent' : 'bg-white'
            } outline-none border border-slate-500 rounded-md`}
          />
        </div>
        {columns.length > 0 && (
          <div className='w-full'>
            <header className='text-sm font-medium pb-2'>Column</header>
            {columns.map((col) => (
              <div key={col.name} className='w-full flex justify-between items-center mb-3'>
                <p
                  className={`border font-bold text-sm rounded-md pl-2 border-slate-500 py-1 px-0.5 w-full mr-3 ${
                    dark ? 'text-white' : 'text-black'
                  }`}
                >
                  {col.name}
                </p>
                <button
                  className={`${dark ? 'text-white' : 'text-slate-500'} font-bold text-xl text-end`}
                  onClick={() => deleteColumn(col.id)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}
        {showInput && (
          <div className='w-full flex justify-between items-center gap-3'>
            <button
              style={{ backgroundColor: color }}
              className='mt-2 w-fit rounded-md text-black px-2 py-1'
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              {showColorPicker ? 'Close' : 'Color'}
            </button>
            <input
              type='text'
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              placeholder='e.g Todo'
              className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${
                dark ? 'bg-transparent' : 'bg-white'
              } outline-none border border-slate-500 rounded-md`}
            />
            <button
              onClick={addToColumns}
              className='text-normal  bg-purple-1 rounded-md h-fit p-1 mt-1 font-bold text-white text-end'
            >
              Add
            </button>
          </div>
        )}

        {showColorPicker && (
          <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
        )}

        <button
          onClick={() => setShowInput(true)}
          className='w-80vw bg-slate-200 text-purple-1 font-extrabold rounded-3xl py-2 text-xs'
        >
          + Add New Column
        </button>
        <button
          className='w-80vw bg-purple-1 text-white font-medium rounded-3xl py-2 text-xs'
          onClick={addBoard}
        >
          Create New Board
        </button>
        <button onClick={() => closeBoardModal()} className='absolute right-3 top-5'>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default AddBoard;
