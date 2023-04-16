import React from 'react'
import { useDispatch } from 'react-redux'
import { showEditBoardModal } from '../features/toggle/toggleSlice'

const EmptyBoard = () => {
  const dispatch = useDispatch()

  const showModal = () =>{
    dispatch(showEditBoardModal())
  }
  
  return (
    <div className='w-[493px] h-[103px] flex flex-col justify-between items-center py-2'>
        <p className='normal-case text-lg text-gray-1 font-medium'>This board is empty. Create a new column to get started</p>
        <button className='w-fit h-fit rounded-3xl hover:bg-indigo-300 bg-purple-1 text-white px-6 py-2 text-xl font-bold' onClick={()=>showModal()}>+ Add New Column</button>
    </div>
  )
}

export default EmptyBoard