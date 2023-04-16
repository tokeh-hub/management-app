import React from 'react'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { showEditTaskModal } from '../features/toggle/toggleSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setSelectedBoard, getBoards } from '../features/board/boardSlice'
const EditTask = () => {
  const {currentTask} = useSelector(state=>state.board.currentTask)
  const {selectedBoard} = useSelector(state=>state.board.selectedBoard)
  const {dark} = useSelector(state=>state.toggle)
  const [columns,setColumns] = useState(selectedBoard?.columns)
  var ass = []
  var ta = []
  const dispatch = useDispatch()
  const [title,setTitle] = useState(currentTask?.title)
  const [description,setDescription] = useState(currentTask?.description)
  const [subtasks,setSubtasks] = useState(currentTask?.subtasks)
  const [status,setStatus] = useState(currentTask?.status)
  const [id,setId] = useState(currentTask?.id)
  const [subtaskName,setSubtaskName] = useState('')
  const [showInput,setShowInput] = useState(false)

  const closeModal = () =>{
    dispatch(showEditTaskModal())
  }

  const changeStatus = (e) =>{
    setStatus(e.target.value)
    const found = selectedBoard?.columns.find(col=>col.name === e.target.value)
    setId(`${e.target.value}${found?.tasks?.length + 1}`)
 }

  const deleteSubtask = (id) =>{
    const filtered = subtasks.filter(subtask=>subtask.id !== id)
    setSubtasks(filtered)
  }
  
  const addSubtasks = () =>{
    const subtask = {
      "id":subtasks.length + 1,
      "title": subtaskName,
      "isCompleted": false
    }
    setSubtasks([...subtasks,subtask])
    setSubtaskName('')

  }

  const getBoardsF = async () =>{
    const response = await axios.get(`https://mykanban-onpl.onrender.com/boards`)
    dispatch(getBoards(response.data))
    dispatch(setSelectedBoard(response.data[selectedBoard.id -1]))
  }

  
  const editTask = async () =>{
    var a = {
               "id":id, 
               "title": title,
                "description": description,
                "status": status,
                "subtasks": subtasks
           }
    var statusChange = false
    // var tempCols = null
    columns?.forEach((col,index) => {
      if(col.name === currentTask.status){
         ta = col.tasks.slice()
        ta.forEach((t,index)=>{
          if(t.id === id){
             ta[index] = a
             console.log('ta',ta)
          }
        })
        if(currentTask.status !== status){
          statusChange = true
          const filter = ta.filter(t=>t.id !== currentTask.id)
          ta = filter
        }
         const updated = {...col,tasks:ta}
         ass = columns.slice()
         ass[index] = updated
        //  tempCols = ass
        setColumns(ass)
        return;
      }
    })
    if(statusChange){
      columns.forEach((col,index)=>{
        if(col.name === status){
          var x = col.tasks.slice()
          x.push(a)
          const updated = {...col,tasks:x}
          ass[index] = updated
          return;
        }})
    }
    try {
      // eslint-disable-next-line
      const response = await axios.patch(`https://mykanban-onpl.onrender.com/boards/${selectedBoard.id}`,{
        columns:ass
      })
      toast('Task updated')
      closeModal()
      getBoardsF()
     } catch (error) {
  }
  }

  return (
    <div className='flex flex-col justify-center items-center modal' onClick={() => {closeModal()}}>
  <div onClick={e => { e.stopPropagation()}} className={`w-[300px] xs:w-[500px] sm:w-[600px] h-fit rounded-md ${dark ? 'bg-gray-7 text-white' :'bg-white text-slate-500'} p-5 flex flex-col gap-5 relative`}>
        <header className={`${dark ? 'text-white' : 'text-black'} font-bold`}>Edit Task</header>
        <div>
          <label className='text-sm font-medium'>Title</label>
          <input type='text' value={title} onChange={e=>setTitle(e.target.value)} placeholder='Task Title' className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${dark ? 'bg-transparent' : 'bg-white'} outline-none border border-slate-500 rounded-md`}/>
        </div>
        <div>
          <label className='text-sm font-medium'>Description</label>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder='Task Description' className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${dark ? 'bg-transparent' : 'bg-white'} outline-none border border-slate-500 rounded-md`}/>
        </div>
        {subtasks.length > 0 && <div className='w-full'>
            <h3 className='text-sm font-medium pb-2'>Subtasks</h3>
            {subtasks.map(subtask=>( 
                <div key={subtask.id} className='w-full flex justify-between items-center mb-3'>
                  <p className={`border font-bold text-sm rounded-md pl-2 border-slate-500 py-1 px-0.5 w-full mr-3 ${dark ? "text-white" : "text-black"}`}>{subtask.title}</p>
                  <button className={`${dark ? "text-white" : "text-slate-500"} font-bold text-xl text-end`} onClick={()=>deleteSubtask(subtask.id)}><FaTimes /></button> 
                </div>
            ))}
        </div>}
        {showInput && 
            <div className='w-full flex justify-between items-center gap-3'>
                  <input type='text' value={subtaskName} onChange={e=>setSubtaskName(e.target.value)} placeholder='Subtask Name' className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${dark ? 'bg-transparent' : 'bg-white'} outline-none border border-slate-500 rounded-md`}/>
                  <button onClick={()=>addSubtasks()} className='text-normal  bg-purple-1 rounded-md h-fit p-1 mt-1 font-bold text-white text-end'>Add</button> 
            </div>
        }
        <div>
              <h3 className='text-sm font-medium pb-2'>Status</h3>
              <select value={status} onChange={e=>changeStatus(e)} className={`mt-2 w-full py-1 px-0.5 text-sm pl-2 ${dark ? 'bg-transparent' : 'bg-white'} outline-none border border-slate-500 rounded-md`}>
                 {columns.length ===  1 &&  <option selected >{columns[0].name}</option>} 
                  {columns.map(col=>(
                  <option className = {`${dark ? 'text-black' : 'text-black'}`}>{col.name}</option>
                 
                   ))}
                </select>
        </div>

        
       
        <button onClick={()=>setShowInput(true)} className='w-80vw bg-slate-200 text-purple-1 font-extrabold rounded-3xl py-2 text-xs'>+ Add New Subtask</button>
        <button className='w-80vw bg-purple-1 text-white font-medium rounded-3xl py-2 text-xs' onClick={editTask}>Save Changes</button>
        <button className='absolute right-3 top-5' onClick={closeModal}><FaTimes/></button>
  </div>
  
</div>
  )
}

export default EditTask