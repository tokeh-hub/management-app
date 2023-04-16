import React from 'react'
import BoardHeader from './BoardHeader'
import EmptyBoard from './EmptyBoard'
import BoardContent from './BoardContent'
import BoardActions from './BoardActions'
import { useSelector } from 'react-redux'
const BoardPage = () => {
  const {selectedBoard} = useSelector(state=>state.board.selectedBoard)
  const {boardActions} = useSelector(state=>state.toggle)
  return (
    <div className={`uppercase text-start relative w-screen sm:w-full flex flex-col h-full`}>
      <div className='sticky top-0'>
      <BoardHeader title={selectedBoard?.name}/>
      </div>
     {boardActions &&  <div className='absolute top-16 right-5'>
           <BoardActions/>
      </div>}
      {
        selectedBoard?.columns?.length === 0 ?  <div className='flex-1 flex justify-center items-center overflow-hidden'>
              <EmptyBoard/>
        </div> :  <div className='flex-1 flex'>
              <BoardContent/>
        </div>
      }
       
        
       
        
    </div>
  )
}

export default BoardPage