import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import {sidebarData} from './sidebarData'
import './sidebar.css'
import Button from './button'

function Framebars() {
    const [barclicked, setbarclicked] = useState(false)
    const showsidebar = () => setbarclicked(!barclicked)
    const [logged, setlogin] = useState(false)
    const logState = () => setlogin(!logged)
    return (
        <>
            <nav className='navbar'>
                <div className='start'>
                    <Link to="#" className="bars">
                        <FaIcons.FaBars onClick={showsidebar}/>
                    </Link>
                </div>
                
                <div className='middle'>
                    <h2>image super res</h2>
                </div>

                <div className='end'>
                    <FaIcons.FaGrinAlt className={logged? 'avatar-login right':'avatar-logout right'} onClick={logState}/>
                </div>
            </nav>
            <div className={barclicked ? 'nav-menu active':'nav-menu'}>
                <ul className = 'rows'>
                    <div className = 'toggle'>
                        <Link to='#' className='bars' onClick={showsidebar}>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </div>
                    <hr/>
                    {sidebarData.map((item,index) => Button(item, index)
                    )}
                </ul>
            </div>
        </>
    )
}

export default Framebars