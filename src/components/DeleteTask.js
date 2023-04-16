import axios from 'axios'
import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { showDeleteTaskModal } from '../features/toggle/toggleSlice'
import { setSelectedBoard,getBoards } from '../features/board/boardSlice'
const DeleteTask = () => {
    const dispatch = useDispatch()
    const {selectedBoard} = useSelector(state=>state.board.selectedBoard)
    const {dark} = useSelector(state=>state.toggle)
    const {currentTask} = useSelector(state=>state.board.currentTask)
    const [columns,setColumns] = useState(selectedBoard?.columns)
    var copiedColumns = []
    var copiedTasks = []  
    const getBoardsF = async () =>{
        const response = await axios.get(`https://mykanban-onpl.onrender.com/boards`)
        dispatch(getBoards(response.data))
        dispatch(setSelectedBoard(response.data[selectedBoard.id -1]))
      }

    const deleteTask = async () =>{
        columns.forEach((col,index) => {
            if(col.name === currentTask.status){
                copiedTasks = col.tasks.filter(task=>task.id !== currentTask.id)
                const updated = {...col,tasks:copiedTasks}
                copiedColumns = columns.slice()
                copiedColumns[index] = updated
                console.log('copiedColumns',copiedColumns)
                setColumns(copiedColumns)
            }
        });
        try {
            // eslint-disable-next-line
            const response = await axios.patch(`https://mykanban-onpl.onrender.com/boards/${selectedBoard.id}`,{
                columns:copiedColumns
            })
            getBoardsF()
            closeModal()
        } catch (error) {
       
        }  
    }

    const closeModal = () =>{
        dispatch(showDeleteTaskModal())
    }

  return (
    <div className='flex flex-col justify-center items-center modal' onClick={() => {closeModal()}}>
          <div onClick={e => { e.stopPropagation()}} className={`w-[300px] xs:w-[500px] sm:w-[600px] h-fit rounded-md ${dark ? 'bg-gray-7' : 'bg-white'} p-5 flex font-medium flex-col gap-5 text-slate-500 relative`}>
              <header className='text-red-500 font-medium text-xl'>Delete this Task?</header>
              <p className='font-normal text-sm'>Are you sure you want to delete the '{currentTask.title}' task and its subtasks? This cannot be reversed.</p>
              <div className='flex flex-col sm:flex-row justify-between gap-4'>
                      <button onClick={()=>deleteTask()} className='bg-red-500 hover:bg-red-300 text-white basis-1/2 rounded-3xl py-2'>Delete</button>
                      <button onClick={()=>closeModal()} className='bg-slate-200 hover:bg-indigo-200 basis-1/2 text-purple-1 rounded-3xl py-2'>Cancel</button>
              </div>
          </div>
    </div>
  )
}

export default DeleteTask