import React, { useEffect } from 'react'
import logo from '../assets/kanban logo.jpg'
import { ReactComponent as DownloadSVG } from '../assets/icon-board.svg';
import iconp from '../assets/icon.png'
import sunIcon from '../assets/icon-light-theme.svg'
import moonIcon from '../assets/icon-dark-theme.svg'
import eyelashIcon from '../assets/icon-hide-sidebar.svg' 
import Toggle from 'react-styled-toggle';
import { useDispatch, useSelector } from 'react-redux'
import { showAddBoardModal, sidebarToggle,backgroundToggle} from '../features/toggle/toggleSlice'
import { setSelectedBoard,getBoards} from '../features/board/boardSlice'
import axios from 'axios'

const sun = sunIcon;
const moon = moonIcon;
const eyelash = eyelashIcon;

const SideBar = () => {
    const {dark} = useSelector(state=>state.toggle)
    const {selectedBoard} = useSelector(state=>state.board)
    const {boards} = useSelector(state=>state.board)
    const dispatch = useDispatch()

    const toggleSidebar = () =>{
      dispatch(sidebarToggle())
    }

    const revealAddBoardModal = () =>{
      dispatch(showAddBoardModal())
    }

    const selectBoard = (payload) =>{
      dispatch(setSelectedBoard(payload))
    }

    const toggleBackground = () =>{
      dispatch(backgroundToggle())
    }
    
    const getBoardsF = async () =>{
      const response = await axios.get(`https://mykanban-onpl.onrender.com/boards`)
      dispatch(getBoards(response.data))
      dispatch(setSelectedBoard(response.data[0]))
    }
    
    useEffect(()=>{
       getBoardsF()
       // eslint-disable-next-line
    },[])
    
  return (
    <div className={`relative hidden ${dark ? 'bg-gray-7':'bg-white'} sm:w-[230px] md:w-[240px] lg:w-[300px] h-full overflow-hidden max-h-[1024px] pt-4 border-r-2 ${dark? 'border-gray-8':'border-gray-3'} sm:flex flex-col`}>
        <div className='logo-container w-[152.53px] h-[25.22px] pl-5'>
          <img src={logo} alt='logo' className='w-full h-full' width={200} height={150}/>
        </div>
        <div className='absolute top-[112px] w-full pr-6 flex flex-col font-jakarta text-gray-1'>
              <h3 className='text-justify font-bold text-xs tracking-[2.4px] uppercase mb-3 pl-5'>All Boards ({boards ? boards.length : 0})</h3>
              <ul className='text-justify'>
                {boards?.map(board=>{
                  const activeBoard = selectedBoard?.name === board.name
                    return (
                      <li key={board.name} onClick={()=>selectBoard(board)} className={`flex hover:text-purple-1 hover:font-extrabold gap-3 cursor-pointer pl-5 items-center h-[48px] leading-5 font-bold text-sm ${dark ? `${!activeBoard && 'hover:bg-white'}` : `${!activeBoard && 'hover:bg-indigo-300'}`} hover:rounded-r-3xl hover:w-full ${activeBoard && 'bg-purple-1 rounded-r-3xl w-full'}`}>
                        {/* <img src={icon}  className='h-[16px] w-[16px]'/> */}
                        <DownloadSVG style={{ fill: activeBoard ? 'white' : '#828FA3'}} />
                        <p className={`${activeBoard && 'text-white'}`}>{board.name}</p>
                   </li>
                    )
                         
                   })}
              </ul>
              <button onClick={()=>revealAddBoardModal()} className='text-purple-1 pl-5 gap-3 flex items-center h-[48px] leading-5 font-bold text-sm'>
                 <img src={iconp} alt='iconp' className='h-[16px] w-[16px]'/>
                 <p className=''>+ Create new board</p>
              </button>
        </div>
        <div className='absolute left-[24px] top-[600px] w-[251px] text-gray-1 pl-5' >
              <div className={`${dark ? 'bg-black': 'bg-gray-2'} flex items-center justify-center gap-3  rounded-md h-[48px]`}>
                <img alt='sun' className='h-[15px] w-[15px]' src={sun}/>
                <Toggle
                    defaultChecked = {dark}
                    onChange= {toggleBackground}
                    backgroundColorChecked = '#635FC7'
                    backgroundColorButton = 'white'
                />
                <img alt='moon' className='h-[15px] w-[15px]' src={moon}/>
              </div>
              <button onClick={()=>toggleSidebar()} className='h-[48px] flex justify center items-center gap-3 font-bold text-xs font-jakarta'>
                <img alt='eyelash' src={eyelash} width={20} height={15}/>
                <p>Hide Sidebar</p>
              </button>
        </div>
        
    </div>
  )
}

export default SideBar