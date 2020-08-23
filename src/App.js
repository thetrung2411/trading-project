import React, { useState, useEffect } from "react";
import "./App.css";
import Tutorial from "./components/Tutorial/Tutorial"
import PriceChart from "./components/PriceChart/PriceChart";
import { NavBar, NavItem, DropdownMenu } from "./components/NavBar/NavBar";
import SideTable from "./components/SideTable/SideTable";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import HelpIcon from '@material-ui/icons/Help';
import io from 'socket.io-client'
const socket = io('http://localhost:4000');
function App() {
  const [crypto, setCrypto] = useState("BTCUSDT");
  const [stream, setStream] = useState('btcusdt')
  socket.on(stream, data => {
    data = JSON.parse(data)
    // console.log(crypto, data.s)
    if(data.s === crypto){
          console.log(data)
    }
  })
  function showTutorial() {
    document.getElementsByClassName("tutorial")[0].style.display = "flex";
  }
  useEffect(() => {
  return () => {
    socket.off(stream)
  }
  }, [stream]);

return (
    <div className="App">
      {/* this will be header */}
      <Tutorial></Tutorial>
      <div className="header">
        <NavBar>
          {/* <NavItem icon ={<AddIcon/>}></NavItem> */}
          {/* <NavItem icon ={<AddIcon/>}></NavItem> */}
          <NavItem icon={<HelpIcon onClick={showTutorial} />}></NavItem>
          <NavItem icon={<ArrowDropDownIcon />}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </NavBar>
      </div>
      <div className="main">
        <PriceChart crypto={crypto}></PriceChart>
      </div>
      <div className="side">
        <SideTable setCrypto={setCrypto} setStream={setStream} socket={socket}></SideTable>
      </div>
      {/* </section> */}
      {/* <div className = 'footer'> */}
      {/* </div>; */}
    </div>
  );
}

export default App;
