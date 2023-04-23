import React from 'react'
import SideBar from './SideBar'
import BoardPage from './BoardPage'
import { ReactComponent as DownloadSVG } from '../assets/icon-show-sidebar.svg';
import { useSelector,useDispatch } from 'react-redux'
import EditBoard from './EditBoard';
import AddTask from './AddTask';
import Boards from './Boards';
import { sidebarToggle } from '../features/toggle/toggleSlice'
import AddBoard from './AddBoard';
import TaskDetails from './TaskDetails';
import DeleteBoard from './DeleteBoard';
import DeleteTask from './DeleteTask';
import EditTask from './EditTask';
const Home = () => {
  const dispatch = useDispatch()
  const {hideSidebar,addBoardModal,editTaskModal,showBoards,taskDetailModal,deleteTaskModal,editBoardModal,addTaskModal,deleteBoardModal,dark} = useSelector(state=> state.toggle)

  const setToggle = () =>{
    dispatch(sidebarToggle())
  }
  
  return (
    <div className={`flex relative ${dark ? 'bg-black' : 'bg-gray-3'} w-full h-screen overflow-y-auto`}>
            {addBoardModal && <AddBoard/>}
            {taskDetailModal && <TaskDetails/>}
            {editBoardModal && <EditBoard/>}
            {deleteBoardModal && <DeleteBoard/>}
            {deleteTaskModal && <DeleteTask/>}
            {addTaskModal && <AddTask/>}
            {editTaskModal && <EditTask/>}
            {showBoards && <Boards/>}


            <div className={`sidebar ${hideSidebar && 'hidden'} sm:w-[300px]`}>
                     <SideBar/>
            </div>
            <div className={`board ${!hideSidebar && 'sm:max-w-[1300px] h-screen'} sm:w-full h-full`}>
                 <BoardPage />
            </div>

            <button onClick={()=>setToggle()} className={`${!hideSidebar && 'hidden'} absolute bottom-24 w-8 pr-2 flex justify-center items-center h-12  bg-purple-1 rounded-r-3xl`}>
                  <DownloadSVG/>
            </button>

    </div>
  )
}

export default Home