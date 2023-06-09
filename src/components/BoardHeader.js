import React from 'react';
import elipsisIcon from '../assets/icon-vertical-ellipsis.svg';
import logoIcon from '../assets/logo-mobile.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RxCaretDown } from 'react-icons/rx';
import {showAddTaskModal,showBoardActions,showAvailableBoards} from '../features/toggle/toggleSlice';


const elipsis = elipsisIcon
const logo = logoIcon

const BoardHeader = ({ title }) => {
  const dispatch = useDispatch();
  const { selectedBoard,boards } = useSelector(state => state.board);
  const { dark } = useSelector(state => state.toggle);
  const columnsPresent = selectedBoard?.columns?.length > 0;


  const showActions = () => {
    dispatch(showBoardActions());
  };

  const showBoards = () => {
    dispatch(showAvailableBoards());
  };

  const showAddTask = () => {
    dispatch(showAddTaskModal());
  };

  return (
    <div>
      {/* Desktop view */}
      <div className={`min-h-[70px] ${dark ? 'bg-gray-7' : 'bg-white'} shadow-md sticky hidden sm:flex justify-between px-8 items-center`}>
        <h3 className={`text-xl ${dark ? 'text-white' : ''} font-bold h-[30px] font-jakarta capitalize`}>
          {title}
        </h3>
        <div>
          <div className='w-fit flex gap-4 h-10'>
            {/* Button to add a new task */}
            <button
              onClick={showAddTask}
              className={`w-fit rounded-3xl ${columnsPresent ? 'opacity-1 hover:bg-indigo-300' : 'opacity-30'} bg-purple-1 text-white px-3 py-1 text-xs font-bold`}
            >
              + Add New Task
            </button>
            {/* Button to show board actions */}
            <button disabled={boards.length < 1} onClick={showActions} >
              <img src={elipsis} alt='elipsis' width={200} height={150} className={`${boards.length < 1 ? "opacity-30" : "opacity-1"} w-[100%]`} />
            </button>
          </div>
          {/* Conditional rendering of board actions */}
          {/* {boardActions && <div className='block'><BoardActions/></div> } */}
        </div>
      </div>

      {/* Mobile view */}
      <div className={`min-h-[70px] ${dark ? 'bg-gray-7' : 'bg-white'} w-screen shadow-md sticky sm:hidden flex px-8 justify-between items-center`}>
        <div className='flex gap-3'>
          {/* Logo */}
          <div className='logo-container flex justify-center items-center'>
          <img src={logo} alt='logo' className='w-[100%]' width={200} height={150} />
          </div>
          {/* Board name and dropdown button */}
          <div className='flex justify-between gap-1'>
            <h3 className={`${dark && 'text-white'} font-medium text-xl`}>{selectedBoard?.name}</h3>
            <button onClick={showBoards} aria-label="Show Boards" className='focus:outline-black focus:border'>
            <RxCaretDown color='#635FC7' fontSize={20} />
            <span className="sr-only">Show Boards</span>
          </button>

          </div>
        </div>

        {/* Buttons for adding a new task and showing board actions */}
        <div className='flex gap-4'>
          <button
            onClick={showAddTask}
            className={`${columnsPresent ? 'opacity-1 hover:bg-indigo-300' : 'opacity-30'}  w-fit bg-purple-1 rounded-3xl px-6 py-1 text-lg flex justify-center items-center text-white`}
          >
            +
          </button>
          <button onClick={showActions} disabled={boards.length < 1}>
          <img src={elipsis} alt='elipsis' className={`${boards.length < 1 ? "opacity-30" : "opacity-1"} w-[100%]`} width={200} height={150} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
