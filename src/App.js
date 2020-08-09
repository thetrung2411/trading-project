import React, { useState, useEffect} from "react";
import "./App.css";
import PriceChart from "./PriceChart"
import {NavBar, NavItem, DropdownMenu} from "./NavBar"
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useInterval } from "./helper";
function App() { 
  const [map, setMap] = useState()
  const [change, setChange] = useState('')
  const [searchGrow, setSearchGrow] = useState('false')
  const [arrayOfSymbol, setArrayOfSymbol] = useState(['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'BCHUSDT'])
  function add(e){
    e.preventDefault()
    //should wait for the map render
    console.log(map.get(change))
    if(map.get(change) === undefined){
    alert('Not found')
    }
    else{
    setArrayOfSymbol([...arrayOfSymbol, change])
    }
  }

  // function remove(e){
  //   e.preventDefault()
  //   arrayOfSymbol.pop()
  //   setArrayOfSymbol(arrayOfSymbol)
  // }
  function typing(e){
    e.preventDefault()
    var upperCase = e.target.value.toUpperCase()
    setSearchGrow('true')
    if(e.target.value === ''){
      setSearchGrow('false')
    }
    setChange(upperCase)
  }
  // function search(e){
    //TO DO: modify this to add more key to the table 
  //   console.log(map.get(e.target.value))
  // }

useEffect(() => {
  console.log(change)
  console.log(searchGrow)
},[change, searchGrow])
// },[arrayOfSymbol])
useInterval(() =>{
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
      {/* <NavItem icon ={<AddIcon/>}></NavItem>
      <NavItem icon ={<AddIcon/>}></NavItem>
      <NavItem icon ={<AddIcon/>}></NavItem> */}
      <NavItem icon ={<ArrowDropDownIcon/>}><DropdownMenu></DropdownMenu></NavItem>
    </NavBar>
    </div>
    {/* <div ref={chartRef} className = 'chart'></div> */}
    {/* <section class="basic-grid"> */}
    {/* <PriceChart data={info}></PriceChart> */}
    {/* // this will be main */}
    <div className = 'main'>
    <PriceChart></PriceChart>
    </div>
    <div className ='side'>
      <div className='sideChildTop'>
        <div className='sideChildTopUp'>
            <div className = 'searchBar' data-type={`${searchGrow}`}>
              <input className = 'input' placeholder='Search...' onChange={typing} ></input>
            </div>
            <button className='addButton' onClick={add}> Add </button>
          </div>
        <div className='sideChildTopDown'>
          <div className='columnLabel'>Symbol</div>
          <div className='columnLabel'>Last Price</div>
          <div className='columnLabel'>Chage</div>
          <div className='columnLabel'>Chg  %</div>
        </div>
      </div>
      <div className = 'sideChildDown'> 
      {sideChild}
      </div> 
    </div>
    {/* </section> */}
    {/* //the side should be at this point */}
    <div className = 'footer'>
  </div>;
  </div>
}

export default App;
