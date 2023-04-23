import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { ReactComponent as DownloadSVG } from '../assets/icon-board.svg';
import { setSelectedBoard } from '../features/board/boardSlice';
import sun from '../assets/icon-light-theme.svg'
import moon from '../assets/icon-dark-theme.svg'
import iconp from '../assets/icon.png'
import Toggle from 'react-styled-toggle';
// import { ToggleSlider }  from "react-toggle-slider";
import { backgroundToggle, showAvailableBoards,showAddBoardModal } from '../features/toggle/toggleSlice';

const Boards = () => {
    const {boards} = useSelector(state=>state.board.boards)
    const {dark} = useSelector(state=>state.toggle)
    const dispatch = useDispatch()
    console.log('dark',dark)
    const {selectedBoard} = useSelector(state=>state.board.selectedBoard)
    
    const revealAddBoardModal = () =>{
        dispatch(showAvailableBoards())
        dispatch(showAddBoardModal())
      }


    const selectBoard = (payload) =>{
        dispatch(setSelectedBoard(payload))
      }
    const toggleBackground = () =>{
    dispatch(backgroundToggle())
    }

    const closeModal = () =>{
        dispatch(showAvailableBoards())
    }
  
  return (
    <div className='flex flex-col justify-center items-center modal' onClick={() => {closeModal()}}>
            <div onClick={e => { e.stopPropagation()}} className={`${dark ? 'bg-gray-6 text-slate-400':'bg-white text-slate-500'} mb-72 w-[300px] font-medium py-5 rounded-md font-jakarta`}>
            <h3 className='text-justify font-bold text-xs tracking-[2.4px] uppercase mb-3 pl-5'>All Boards ({boards ? boards.length : 0})</h3>
            <ul className='text-justify pr-6'>
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
            <button onClick={()=>revealAddBoardModal()} className='text-purple-1 pl-5 pb-4 gap-3 flex items-center h-[48px] leading-5 font-bold text-sm'>
                 <img src={iconp} alt='iconp' className='h-[16px] w-[16px]'/>
                 <p className=''>+ Create new board</p>
              </button>
            <div className={`${dark ? 'bg-black': 'bg-gray-2'} flex items-center justify-center gap-3 mx-5  rounded-md h-[48px]`}>
                <img alt='sun' className='h-[15px] w-[15px]' src={sun}/>
                <Toggle
                    checked = {dark}
                    onChange= {toggleBackground}
                    backgroundColorChecked = '#635FC7'
                    // backgroundColorUnchecked = 'white'
                    backgroundColorButton = 'white'
                />
                {/* <ToggleSlider
                      handleBackgroundColor='white'
                      handleBackgroundColorActive='white'
                      barBackgroundColorActive='#635FC7'
                      active={dark}
                      onToggle={toggleBackground}
                /> */}
                <img alt='moon' className='h-[15px] w-[15px]' src={moon}/>
              </div>

            </div>
          
    </div>
  )
}

export default Boards