import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { showEditTaskModal } from '../features/toggle/toggleSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setSelectedBoard, getBoards } from '../features/board/boardSlice';

const EditTask = () => {
  const dispatch = useDispatch();

  // Redux state
  const { selectedBoard, currentTask } = useSelector((state) => state.board);
  const { dark } = useSelector((state) => state.toggle);

  // Local state
  const [title, setTitle] = useState(currentTask?.title ?? '');
  const [subtasks, setSubtasks] = useState(useMemo(() => currentTask?.subtasks ?? [], [currentTask]));
  const [description, setDescription] = useState(currentTask?.description ?? '');
  const [status, setStatus] = useState(currentTask?.status ?? '');
  const [id, setId] = useState(currentTask?.id ?? '');
  const [subtaskName, setSubtaskName] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Memoized values
  const columns = useMemo(() => selectedBoard?.columns ?? [], [selectedBoard]);
  
  useEffect(() => {
    if (selectedBoard) {
      setTitle(currentTask?.title ?? '');
      setDescription(currentTask?.description ?? '');
      setStatus(currentTask?.status ?? '');
      setId(currentTask?.id ?? '');
      setSubtaskName('');
      setShowInput(false);
    }
  }, [selectedBoard, currentTask]);

  // Close modal
  const closeModal = useCallback(() => {
    dispatch(showEditTaskModal());
  }, [dispatch]);

  // Change status
  const changeStatus = useCallback((e) => {
    setStatus(e.target.value);
    const found = selectedBoard?.columns.find((col) => col.name === e.target.value);
    setId(`${e.target.value}${found?.tasks?.length + 1}`);
  }, [selectedBoard]);

  // Delete subtask
  const deleteSubtask = useCallback((id) => {
    setSubtasks((prevSubtasks) =>
      prevSubtasks.filter((subtask) => subtask.id !== id)
    );
  }, []);

  // Add subtask
  const addSubtask = useCallback(() => {
    const newSubtask = {
      id: subtasks?.length + 1,
      title: subtaskName,
      isCompleted: false,
    };
    setSubtasks((prevSubtasks) => [...prevSubtasks, newSubtask]);
    setSubtaskName('');
  }, [subtasks, subtaskName]);

  // Get boards data
  const getBoardsData = useCallback(async () => {
    try {
      const response = await axios.get('https://mykanban-onpl.onrender.com/boards');
      dispatch(getBoards(response.data));
      dispatch(setSelectedBoard(response.data[selectedBoard.id - 1]));
    } catch (error) {
      // Handle error
    }
  }, [dispatch, selectedBoard]);

  // Edit task
  const editTask = useCallback(async () => {
    const updatedTask = {
      id,
      title,
      description,
      status,
      subtasks,
    };

    let statusChange = false;
    const columnsCopy = [...columns];

    const updatedColumns = columnsCopy.map((col) => {
      if (col.name === currentTask.status) {
        const tasksCopy = [...col.tasks];
        const taskArrayCopy = tasksCopy.map((task) => {
          if (task.id === id) {
            return updatedTask;
          }
          return task;
        });

        if (currentTask.status !== status) {
          statusChange = true;
          return { ...col, tasks: taskArrayCopy.filter((task) => task.id !== currentTask.id) };
        }

        return { ...col, tasks: taskArrayCopy };
      }
      return col;
    });

    if (statusChange) {
      const columnIndex = updatedColumns.findIndex((col) => col.name === status);
      if (columnIndex !== -1) {
        const columnCopy = { ...updatedColumns[columnIndex] };
        const tasksCopy = [...columnCopy.tasks];
        tasksCopy.push(updatedTask);
        columnCopy.tasks = tasksCopy;
        updatedColumns[columnIndex] = columnCopy;
      }
    }

    try {
      await axios.patch(`https://mykanban-onpl.onrender.com/boards/${selectedBoard.id}`, {
        columns: updatedColumns,
      });

      toast('Task updated');
      closeModal();
      getBoardsData();
    } catch (error) {
      // Handle error
    }
  }, [
    closeModal,
    selectedBoard,
    currentTask,
    columns,
    id,
    title,
    description,
    status,
    subtasks,
    getBoardsData,
  ]);

  return (
    <div
      className='flex flex-col justify-center items-center modal'
      onClick={() => {
        closeModal();
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`w-[300px] xs:w-[500px] sm:w-[600px] h-fit rounded-md ${
          dark ? 'bg-gray-7 text-white' : 'bg-white text-slate-500'
        } p-5 flex flex-col gap-5 relative`}
      >
        <header className={`${dark ? 'text-white' : 'text-black'} font-bold`}>Edit Task</header>
        <div>
          <label className='text-sm font-medium'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Task Title'
            className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${
              dark ? 'bg-transparent' : 'bg-white'
            } outline-none border border-slate-500 rounded-md`}
          />
        </div>
        <div>
          <label className='text-sm font-medium'>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Task Description'
            className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${
              dark ? 'bg-transparent' : 'bg-white'
            } outline-none border border-slate-500 rounded-md`}
          />
        </div>
        {subtasks?.length > 0 && (
          <div className='w-full'>
            <h3 className='text-sm font-medium pb-2'>Subtasks</h3>
            {subtasks?.map((subtask) => (
              <div key={subtask.id} className='w-full flex justify-between items-center mb-3'>
                <p
                  className={`border font-bold text-sm rounded-md pl-2 border-slate-500 py-1 px-0.5 w-full mr-3 ${
                    dark ? 'text-white' : 'text-black'
                  }`}
                >
                  {subtask.title}
                </p>
                <button
                  className={`${dark ? 'text-white' : 'text-slate-500'} font-bold text-xl text-end`}
                  onClick={() => deleteSubtask(subtask.id)}
                >
                  <FaTimes />
                </button>
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
              className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${
                dark ? 'bg-transparent' : 'bg-white'
              } outline-none border border-slate-500 rounded-md`}
            />
            <button
              onClick={() => addSubtask()}
              className='text-normal  bg-purple-1 rounded-md h-fit p-1 mt-1 font-bold text-white text-end'
            >
              Add
            </button>
          </div>
        )}
        <div>
          <h3 className='text-sm font-medium pb-2'>Status</h3>
          <select
            value={status}
            onChange={(e) => changeStatus(e)}
            className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${
              dark ? 'bg-transparent' : 'bg-white'
            } outline-none border border-slate-500 rounded-md`}
          >
            {columns?.length === 1 && <option selected>{columns[0].name}</option>}
            {columns?.map((col) => (
              <option key={col.name} className={`${dark ? 'text-black' : 'text-black'}`}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowInput(true)}
          className='w-80vw bg-slate-200 text-purple-1 font-extrabold rounded-3xl py-2 text-xs'
        >
          + Add New Subtask
        </button>
        <button
          className='w-80vw bg-purple-1 text-white font-medium rounded-3xl py-2 text-xs'
          onClick={editTask}
        >
          Save Changes
        </button>
        <button className='absolute right-3 top-5' onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default React.memo(EditTask);
