import React, {useState} from "react";
import "./App.css";
import PriceChart from "./components/PriceChart/PriceChart";
import {NavBar, NavItem, DropdownMenu} from "./components/NavBar/NavBar";
import AddIcon from '@material-ui/icons/Add';
import SideTable from './components/SideTable/SideTable';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
function App() { 
  const [crypto, setCrypto] = useState('BTCUSDT')
  // const [showTutorial, setShowTutorial] = useState('false')
  // function openTutorial(){
  //   setShowTutorial(true)
  // }
  return (<div className="App">
   {/* this will be header */}
   <div className="header">
    <NavBar>
      {/* <NavItem icon ={<AddIcon/>}></NavItem> */}
      {/* <NavItem icon ={<AddIcon/>}></NavItem> */}
      <NavItem icon ={<AddIcon/>}></NavItem>
      <NavItem icon ={<ArrowDropDownIcon/>}><DropdownMenu></DropdownMenu></NavItem>
    </NavBar>
    </div>
    <div className = 'main'>
    <PriceChart crypto = {crypto}></PriceChart>
    </div>
    <div className ='side' >
      <SideTable setCrypto={setCrypto}></SideTable>
    </div>
    {/* </section> */}
    {/* <div className = 'footer'> */}
  {/* </div>; */}
  </div>
  )}

export default App;
