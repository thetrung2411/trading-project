import React,{useState} from 'react'
import "./NavBar.css"
import AddIcon from '@material-ui/icons/Add';
import {CSSTransition} from 'react-transition-group'
// import {useHistory} from 'react-router-dom'
export function NavBar(props){
    return(
        <nav className="navBar">
            <ul className="navBar-child">{props.children}</ul>
        </nav>
    )
}
export function NavItem(props){
    const [open, setOpen] = useState(false)
    function toggleOpen(){
        setOpen(!open)
    }
    return (
        <li className="navItem">
            <a href="#a" className="iconButton" onClick={toggleOpen}>
                 {props.icon}
            </a>
            {open && props.children}
        </li>
    )
}

export function DropdownMenu(){
    const [activeMenu, setActiveMenu] = useState('main')
    const [menuHeight, setMenuHeight] = useState(null)
    function calcHeight(el){
        const height = el.offsetHeight;
        setMenuHeight(height)
    }
        function DropdownMenuItem(props){
        return(
            <a href="#b" className="dropdownItem" onClick= {() => props.goToMenu && setActiveMenu(props.goToMenu)} >
                <span className ="iconButton">{props.leftIcon}</span>    
                {props.children}
                <span className ="iconRight">{props.rightIcon}</span>
            </a>
        )
     }
    return(
        <div className = "dropdown" style= {{height: menuHeight}}>
            <CSSTransition in={activeMenu === 'main'} unmountOnExit timeout={500} classNames = "menu-primary" onEnter={calcHeight}>
            <div className="menu" >
            <a href="#c" onClick={() => window.open('https://www.linkedin.com/in/the-trung-phan-1960b8171/')}>
            <DropdownMenuItem >My LinkedIn profile</DropdownMenuItem>
            </a>
            <a href="#c" onClick={() => window.open('https://github.com/thetrung2411')}>
            <DropdownMenuItem >My Github</DropdownMenuItem>
            </a>
            <DropdownMenuItem leftIcon={<AddIcon/>} goToMenu="settings">Other applications</DropdownMenuItem>
            </div>
            </CSSTransition>
            <CSSTransition in={activeMenu === 'settings'} unmountOnExit timeout={500} classNames = "menu-secondary" onEnter={calcHeight}>
            <div className="menu">
            <DropdownMenuItem  goToMenu="main">Back</DropdownMenuItem>
            <a href="#c" onClick={() => window.open('https://blissful-ardinghelli-b94d01.netlify.app/login')}>
            <DropdownMenuItem >Wise Tech Global Application</DropdownMenuItem>
            </a>
            <a href="#c" onClick={() => window.open('https://blue-dit.herokuapp.com/default')}>
            <DropdownMenuItem >Bluedit Application</DropdownMenuItem>
            </a>
            <a href="#c" onClick={() => window.open('https://uts-13066461.itch.io/untitled-platforming-game')}>
            <DropdownMenuItem >Untitled Platforming Game</DropdownMenuItem>
            </a>
            </div>
            </CSSTransition>
        </div>
    )
}




