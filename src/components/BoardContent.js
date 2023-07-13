import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showEditBoardModal } from '../features/toggle/toggleSlice';
import { FaCircle } from 'react-icons/fa';
import Task from './Task';

const BoardContent = () => {
  const { selectedBoard } = useSelector(state => state.board);
  const { hideSidebar, dark } = useSelector(state => state.toggle);
  const columns = selectedBoard?.columns;
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(showEditBoardModal());
  };

  return (
    <div className={`flex ${!hideSidebar && 'overflow-x-auto h-screen'} min-w-full overflow-y-auto h-full gap-5 px-8 pt-5`}>
      {columns?.map(column => (
        <div key={column.id} className='column flex flex-col gap-5'>
          <div className='flex gap-3 justify-start items-center w-40 px-2'>
            {column.color && <p className='rounded-full '><FaCircle color={column?.color} /></p>}
            <h4 className={`${dark ? 'text-white' : 'text-slate-500'} text-xs font-jakarta font-extrabold`}>{column?.name}</h4>
            <p className={`${dark ? 'text-white' : 'text-slate-500'} text-xs font-jakarta font-extrabold`}>( {column.tasks?.length} )</p>
          </div>
          <div className='flex flex-col gap-5'>
            {column?.tasks?.map(task => (
              <Task key={task.id} title={task.title} task={task} columns={columns} subtasks={task.subtasks} />
            ))}
          </div>
        </div>
      ))}
      <button onClick={() => showModal()} className={`${dark ? 'bg-gray-7' : 'bg-gray-300 hover:text-purple-1'} text-gray-1 font-medium text-md shadow-md mt-10 h-screen rounded-md w-[400px] flex justify-center items-center`}>
        + New Column
      </button>
    </div>
  );
}

export default BoardContent;
