import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { showEditTaskModal,showDeleteTaskModal,showTaskActions, showTaskDetailModal } from '../features/toggle/toggleSlice'

const TaskActions = () => {
    const dispatch = useDispatch()
    const {dark} = useSelector(state=>state.toggle)
    const editTask = () =>{
        dispatch(showEditTaskModal())
        dispatch(showTaskDetailModal())
        closeTaskActions()
    }

    const deleteTask = () =>{
        dispatch(showDeleteTaskModal())
        dispatch(showTaskDetailModal())
        closeTaskActions()
    }
    const closeTaskActions = () =>{
        dispatch(showTaskActions())
    }

  return (
    <div className={`${dark ? 'bg-gray-7 shadow-3xl shadow-gray-5' :'bg-white'} relative rounded-md pt-7 pr-7 p-5 flex flex-col gap-3 text-slate-500 shadow-md w-fit h-fit`}>
        <button onClick={()=>editTask()}>Edit Task</button>
        <button onClick={()=>deleteTask()} className='text-red-500'>Delete Task</button>
        <button className='font-bold text-sm top-3 right-4 absolute' onClick={()=>closeTaskActions()}><FaTimes/></button>
    </div>
  )
}

export default TaskActions