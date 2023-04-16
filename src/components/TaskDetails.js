import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {ImCheckboxUnchecked,ImCheckboxChecked} from "react-icons/im"
import { useDispatch } from 'react-redux'
import { showTaskActions, showTaskDetailModal } from '../features/toggle/toggleSlice'
import elipsis from '../assets/icon-vertical-ellipsis.svg'
import TaskActions from './TaskActions'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setSelectedBoard,getBoards} from '../features/board/boardSlice'


const TaskDetails = () => {
    const completedTasks = []
    const {currentTask} = useSelector(state=>state.board.currentTask)
    const {selectedBoard} = useSelector(state=>state.board.selectedBoard)
    const {taskActions,dark} = useSelector(state=>state.toggle)
    const [status] = useState(currentTask?.status)
    const columns = selectedBoard?.columns
    var ass = []
    var ta = []
    const dispatch = useDispatch()
    var subtaskNumber = 0


    const showActionsModal = () =>{
        dispatch(showTaskActions())
    }

    const closeModal = () =>{
        dispatch(showTaskDetailModal())
    }

    const mySubtasks = currentTask?.subtasks
    const totalSubtasks = mySubtasks?.length
    useEffect(()=>{
      mySubtasks.forEach(subtask => {
        // eslint-disable-next-line
        if(subtask.isCompleted === true){subtaskNumber= subtaskNumber + 1; completedTasks.push(subtask.id)}
    });
    },[])
   
    
  const getBoardsF = async () =>{
        const response = await axios.get(`https://mykanban-onpl.onrender.com/boards`)
        dispatch(getBoards(response.data))
        dispatch(setSelectedBoard(response.data[selectedBoard.id -1]))
      }

    const editSubtask = async (id,isCompleted) =>{
        columns?.forEach((col,index) => {
          if(col.name === status){
             ta = col.tasks.slice()
            ta.forEach(((t,index)=>{
              if(t.id === currentTask.id){
                var sub = t.subtasks.slice()
                sub.forEach((subtask,index)=>{
                    if(subtask.id === id){
                        sub[index] = {...subtask,isCompleted:!isCompleted}
                    }
                })
                 
                 const upd = {...t,subtasks:sub}
                 ta[index] = upd
              }
            }))
             const updated = {...col,tasks:ta}
            ass = columns.slice()
            ass[index] = updated
          }
        })
        try {
          // eslint-disable-next-line
          const response = await axios.patch(`https://mykanban-onpl.onrender.com/boards/${selectedBoard.id}`,{
            columns:ass
          })
          toast('Subtask Updated')
          getBoardsF()
         } catch (error) {
          
         }
      }
    

  return (
    <div className='flex flex-col justify-center items-center modal' onClick={() => {closeModal()}}>
    <div onClick={e => { e.stopPropagation()}} className={`w-[300px] xs:w-[500px] sm:w-[600px] h-fit rounded-md ${dark ? 'bg-gray-7' :'bg-white'} px-7 py-5 flex flex-col gap-5 ${dark ? 'text-white': 'text-slate-500'} relative`}>
         <header className={`${dark ? 'text-white' : 'text-black'} font-bold`}>{currentTask.title}</header>
         <p className='text-slate-500 text-sm '>{currentTask.description}</p>
         <div className='text-sm'>
            <h4 className={`${dark ? 'text-white' : 'text-slate-500'} font-medium pb-2`}>Subtasks ({subtaskNumber} of {totalSubtasks})</h4>
             <div className='flex flex-col justify-center gap-3'>
                {currentTask.subtasks.map(subtask=>{
                    const {title,isCompleted,id} = subtask
                    const completed = completedTasks.includes(id)
                    return(
                    <div onClick={()=>{editSubtask(id,isCompleted)}} className={`${dark ? 'bg-zinc-900 text-white' : 'bg-slate-200 text-slate-500'} hover:bg-indigo-200 cursor-pointer font-bold flex items-center h-fit pl-2 py-3 px-1 rounded-md gap-5`}>
                        <button>{completed ? <ImCheckboxChecked color='#635FC7'/> : <ImCheckboxUnchecked/>}</button>
                        {!dark && <p className={`${completed  ? 'line-through text-slate-500' : 'text-black'}`}>{title}</p>}
                        {dark && <p className={`${completed  ? 'line-through text-slate-500' : 'text-white'}`}>{title}</p>}
                    </div>
                    )
                   
})}
             </div>
         </div>
         <div>
             <h3 className='font-bold text-sm pb-2'>Current Status</h3>
             <p className={`border border-slate-500 ${dark ? 'text-white' : 'text-black'} w-full py-2 px-1 rounded-md`}>{currentTask.status}</p>
         </div>
        
         <button className='absolute top-5 right-4 px-5' onClick={()=>showActionsModal()}><img src={elipsis} alt='elipses'/></button>
         {taskActions && <div className='absolute top-10 right-5'>
           <TaskActions/>
         </div>}
    </div>
    </div>
  )
}

export default TaskDetails