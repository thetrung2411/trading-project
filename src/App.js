import React, { useState} from "react";
import "./App.css";
import PriceChart from "./PriceChart"
import {NavBar, NavItem, DropdownMenu} from "./NavBar"
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useInterval } from "./helper";
function App() { 
  // const chartRef = useRef()
  // const chart = createChart(document.getElementById('root'), { width: 750, height: 500 });
  // const momentumChart = createChart(document.getElementById('root'), { width: 750, height: 500 })

  const [symbol, setSymbol] = useState('BTCUSDT')
  const [time, setTime] = useState('1m') 
  const [map, setMap] = useState()
  const [arrayOfSymbol, setArrayOfSymbol] = useState(['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'BCHUSDT'])
  function setData(e){
    e.preventDefault()
    setSymbol(e.target.value)
}
  function changeTime(e){
  e.preventDefault()
  setTime(e.target.value)
}
  function add(e){
    e.preventDefault()
    setArrayOfSymbol([...arrayOfSymbol, 'LINKUSDT'])
  }
  function remove(e){
    e.preventDefault()
    arrayOfSymbol.pop()
    setArrayOfSymbol(arrayOfSymbol)
  }
  function search(e){
    //TO DO: modify this to add more key to the table 
    console.log(map.get(e.target.value))
  }
// useEffect(() => {
  
// },[arrayOfSymbol])
useInterval(() =>{
  // const getChange = async() => {
  //   let response = await fetch ('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')
  //   let data = await response.json();
  //   return data
  // }
  const getAll = async() => {
    let response = await fetch ('https://api.binance.com/api/v3/ticker/24hr')
    let data = await response.json();
    var map = new Map()
    for(let i of data){
        map.set(i.symbol, i)
    }
    return map
  }
  getAll().then(data => setMap(data))
}, 1000)
const sideChild = arrayOfSymbol.map((key) => {
  if(map){
  var obj = map.get(key)
  var currChg = parseFloat(obj.priceChange)
  var currChgP = obj.priceChangePercent.toString() + "%"
  return (
  <div className='sideChild'>
  <div className='coinName'>{key}</div>
  <div className='currPrice'>{parseFloat(obj.lastPrice)}</div>
  <div className='currChg' data-type={`${currChg.toString()[0]}`}>{currChg}</div>
  <div className='currChgPercent' data-type={`${currChgP.toString()[0]}`} >{currChgP}</div>
  </div>
)}
return <div></div>
})
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
   {/* this will be header */}
   <div className="header">
    <NavBar>
      <NavItem icon ={<AddIcon/>}></NavItem>
      <NavItem icon ={<AddIcon/>}></NavItem>
      <NavItem icon ={<AddIcon/>}></NavItem>
      <NavItem icon ={<ArrowDropDownIcon/>}><DropdownMenu></DropdownMenu></NavItem>
    </NavBar>
    </div>
    {/* <div ref={chartRef} className = 'chart'></div> */}
    {/* <section class="basic-grid"> */}
    {/* <PriceChart data={info}></PriceChart> */}
    {/* // this will be main */}
    <div className = 'main'>
    <PriceChart symbol={symbol} time={time}></PriceChart>
    </div>
    <div className ='side'>
      <div className='sideChildTop'>
        <div className='sideChildTopUp'>
            <div className = 'searchBar'></div>
          </div>
        <div className='sideChildTopDown'>
          <div className='columnLabel'>Sybmol</div>
          <div className='columnLabel'>Last</div>
          <div className='columnLabel'>Chage</div>
          <div className='columnLabel'>Chage%</div>
        </div>
      </div>
      <div className = 'sideChildDown'> 
      {sideChild}
      </div> 
    </div>
    {/* </section> */}
    {/* //the side should be at this point */}
    <div className = 'footer'>
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
    <button onClick={remove}> Remove </button>
    <button onClick={add}> Add </button>
    <button onClick={search} value="ETHUSDT"> Search </button>
  </div>;
  </div>
}

export default App;
