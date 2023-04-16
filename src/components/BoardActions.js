import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { showEditBoardModal,showDeleteBoardModal,showBoardActions } from '../features/toggle/toggleSlice'
const BoardActions = () => {
    const dispatch = useDispatch()
    const {dark} = useSelector(state=>state.toggle)

    const editBoard = () =>{
        dispatch(showEditBoardModal())
        closeBoardActions()
    }

    const deleteBoard = () =>{
        dispatch(showDeleteBoardModal())
        closeBoardActions()
    }
    const closeBoardActions = () =>{
        dispatch(showBoardActions())
    }

  return (
    <div className={`${dark ? 'bg-gray-7' : 'bg-white'} relative rounded-md pt-7 pr-7 p-5 flex flex-col gap-3 text-slate-500 shadow-md w-fit h-fit`}>
        <button onClick={()=>editBoard()}>Edit Board</button>
        <button className='text-red-500' onClick={()=>deleteBoard()}>Delete Board</button>
        <button className='font-bold text-sm top-3 right-4 absolute' onClick={()=>closeBoardActions()}><FaTimes/></button>
    </div>
  )
}

export default BoardActions