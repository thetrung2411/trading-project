import React, { useState} from "react";
import "./App.css";
import PriceChart from "./PriceChart"
import {NavBar, NavItem, DropdownMenu} from "./NavBar"
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
function App() { 
  // const chartRef = useRef()
  // const chart = createChart(document.getElementById('root'), { width: 750, height: 500 });
  // const momentumChart = createChart(document.getElementById('root'), { width: 750, height: 500 })
  const [symbol, setSymbol] = useState('BTCUSDT')
  const [time, setTime] = useState('1m') 
  function setData(e){
    e.preventDefault()
    setSymbol(e.target.value)
}
  function changeTime(e){
  e.preventDefault()
  setTime(e.target.value)
}

// async function fetchIdea(){
//   try{
//     let response = await fetch(`http://localhost:5001/trading-project-8c8eb/us-central1/helloWorld`)
//     let data = await response.json()
//     console.log(data)
//   }
//   catch(err){}
// }
// fetch(`http://localhost:5001/trading-project-8c8eb/us-central1/api`).then(console.log)


  return <div className="App">
    <NavBar>
      <NavItem icon ={<AddIcon/>}></NavItem>
      <NavItem icon ={<AddIcon/>}></NavItem>
      <NavItem icon ={<AddIcon/>}></NavItem>
      <NavItem icon ={<ArrowDropDownIcon/>}><DropdownMenu></DropdownMenu></NavItem>
    </NavBar>
    {/* <div ref={chartRef} className = 'chart'></div> */}
    {/* <section class="basic-grid"> */}
    {/* <PriceChart data={info}></PriceChart> */}
    <PriceChart symbol={symbol} time={time}></PriceChart>
    {/* </section> */}
    <select onChange={setData} className="select">
      <option value = "BTCUSDT">BTC/USDT</option>
      <option value = "ETHUSDT">ETH/USDT</option>
      <option value = "BCHUSDT">BCH/USDT</option>
      <option value = "ADAUSDT">ADA/USDT</option>
      <option value = "LINKUSDT">LINK/USDT</option>
      <option value = "TRXUSDT">TRX/USDT</option>
      <option value = "ZRXSDT">ZRX/USDT</option>
      <option value = "LENDUSDT">LEND/USDT</option>

    </select>
    <select onChange={changeTime} className="select">
      <option value = "1m">1M</option>
      <option value = "5m">5M</option>
      <option value = "15m">15M</option>
      <option value = "1h">1H</option>
      <option value = "4h">4H</option>
    </select>
  </div>;
}

export default App;
