import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { showAddTaskModal } from '../features/toggle/toggleSlice';
import { toast } from 'react-toastify';
import { setSelectedBoard, getBoards } from '../features/board/boardSlice';

const AddTask = () => {
  // Access selectedBoard and dark mode from Redux store
  const { selectedBoard } = useSelector((state) => state.board);
  const { dark } = useSelector((state) => state.toggle);

  // Initialize state variables
  const [columns] = useState(selectedBoard?.columns);
  const [status, setStatus] = useState(selectedBoard?.columns[0].name);
  const dispatch = useDispatch();
  const found = selectedBoard?.columns.find((col) => col.name === status);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [tasks, setTasks] = useState(found?.tasks);
  const [subtaskName, setSubtaskName] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Handle status change
  const changeStatus = (e) => {
    setStatus(e.target.value);
    const found = selectedBoard?.columns.find((col) => col.name === e.target.value);
    setTasks(found.tasks);
  };

  // Close modal
  const closeModal = () => {
    dispatch(showAddTaskModal());
  };

  // Add subtasks
  const addSubtasks = () => {
    const subtask = {
      id: subtasks.length + 1,
      title: subtaskName,
      isCompleted: false,
    };
    setSubtasks([...subtasks, subtask]);
    setSubtaskName('');
  };

  // Fetch boards from API
  const getBoardsF = async () => {
    const response = await axios.get(`https://mykanban-onpl.onrender.com/boards`);
    dispatch(getBoards(response.data));
    dispatch(setSelectedBoard(response.data[selectedBoard.id - 1]));
  };

  // Add a task
  const addTask = async () => {
    const task = {
      id: `${status}${tasks?.length + 1}`,
      title: title,
      description: description,
      status: status,
      subtasks: subtasks,
    };

    // Update the columns array with the new task
    const updatedColumns = columns.map((col) => {
      if (col.name === status) {
        const updatedTasks = [...col.tasks, task];
        return { ...col, tasks: updatedTasks };
      }
      return col;
    });

    try {
      // Patch the updated columns to the API
      // eslint-disable-next-line
      const response = await axios.patch(`https://mykanban-onpl.onrender.com/boards/${selectedBoard.id}`, {
        columns: updatedColumns,
      });

      toast('Task Created');
      closeModal();
      getBoardsF();
    } catch (error) {
      // Handle error
    }
  };

  // Delete a subtask
  const deleteSubtask = (id) => {
    const filtered = subtasks.filter((subtask) => subtask.id !== id);
    setSubtasks(filtered);
  };

  return (
    <div className='flex flex-col justify-center items-center modal' onClick={() => closeModal()}>
      <div onClick={(e) => e.stopPropagation()} className={`w-[300px] xs:w-[500px] sm:w-[600px] h-fit rounded-md ${dark ? 'bg-gray-7 text-white' : 'bg-white text-slate-500'} p-5 flex flex-col gap-5 relative`}>
        <header className={`${dark ? 'text-white' : 'text-black'} font-bold`}>Add New Task</header>
        <div>
          <label className='text-sm font-medium'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Task Title'
            className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${dark ? 'bg-transparent' : 'bg-white'} outline-none border border-slate-500 rounded-md`}
          />
        </div>
        <div>
          <label className='text-sm font-medium'>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Task Description'
            className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${dark ? 'bg-transparent' : 'bg-white'} outline-none border border-slate-500 rounded-md`}
          />
        </div>
        {subtasks.length > 0 && (
          <div className='w-full'>
            <h3 className='text-sm font-medium pb-2'>Subtasks</h3>
            {subtasks.map((subtask) => (
              <div key={subtask.id} className='w-full flex justify-between items-center mb-3'>
                <p className={`border font-bold text-sm rounded-md pl-2 border-slate-500 py-1 px-0.5 w-full mr-3 ${dark ? 'text-white' : 'text-black'}`}>{subtask.title}</p>
                <button onClick={() => deleteSubtask(subtask.id)} className={`${dark ? 'text-white' : 'text-slate-500'} font-bold text-xl text-end`}><FaTimes /></button>
              </div>
            ))}
          </div>
        )}
        {showInput && (
          <div className='w-full flex justify-between items-center gap-3'>
            <input
              type='text'
              value={subtaskName}
              onChange={(e) => setSubtaskName(e.target.value)}
              placeholder='Subtask Name'
              className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${dark ? 'bg-transparent' : 'bg-white'} outline-none border border-slate-500 rounded-md`}
            />
            <button onClick={() => addSubtasks()} className='text-normal  bg-purple-1 rounded-md h-fit p-1 mt-1 font-bold text-white text-end'>Add</button>
          </div>
        )}
        <div>
          <h3 className='text-sm font-medium pb-2'>Status</h3>
          <select
            value={status}
            onChange={(e) => changeStatus(e)}
            className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${dark ? 'bg-transparent text-white' : 'bg-white text-black'} outline-none border border-slate-500 rounded-md`}
          >
            {columns.length === 1 && <option selected>{columns[0].name}</option>}
            {columns.map((col) => (
              <option key={col.id} className={`${dark ? 'text-black' : 'text-black'}`}>{col.name}</option>
            ))}
          </select>
        </div>
        <button onClick={() => setShowInput(true)} className='w-80vw bg-slate-200 text-purple-1 font-extrabold rounded-3xl py-2 text-xs'>+ Add New Subtask</button>
        <button className='w-80vw bg-purple-1 text-white font-medium rounded-3xl py-2 text-xs' onClick={() => addTask()}>Create Task</button>
        <button onClick={() => closeModal()} className='absolute right-3 top-5'><FaTimes /></button>
      </div>
    </div>
  );
};

export default AddTask;
