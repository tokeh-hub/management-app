import React from 'react'
import { setSelectedTask } from '../features/board/boardSlice'
import { showTaskDetailModal } from '../features/toggle/toggleSlice'
import { useDispatch,useSelector } from 'react-redux'
const Task = ({title,subtasks,task}) => {
  const dispatch = useDispatch()
  const {dark} = useSelector(state=>state.toggle)
  const setTask = () =>{
    dispatch(showTaskDetailModal())
    dispatch(setSelectedTask(task))
  }
  return (
    <div className={`${dark ? 'bg-gray-7':'bg-white'} w-80 h-fit p-4 normal-case text-sm rounded-md cursor-pointer ${dark ? 'hover:bg-gray-800' :'hover:bg-gray-2'}`} key={title} onClick={()=>setTask()}>
         <h2 className={`${dark ? 'text-white': ''} font-bold mb-3`}>{title}</h2>
         <p className={`${dark ? 'text-slate-500' : ''}`}>{subtasks?.length} subtasks</p>
    </div>
  )
}

export default Task