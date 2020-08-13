import React, { useState, useEffect} from "react";
import './SideTable.css';
import { useInterval } from "../../helper/helper";
function SideTable(){
    const [map, setMap] = useState()
    const [searchGrow, setSearchGrow] = useState('false')
    const [searchResult, setSearchResult] = useState([])
    const [arrayOfSymbol, setArrayOfSymbol] = useState(['BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'BCHUSDT'])
    
    function typing(e){
        e.preventDefault()
        var upperCase = e.target.value.toUpperCase()
        setSearchGrow('true')
        if(e.target.value === ''){
          setSearchGrow('false')
        }
        if(map !== undefined){
          setSearchResult([...map.keys()].filter(e => e.includes(upperCase)))
        }
      }

    function addList(e){
        e.preventDefault()
        setSearchGrow(false)
        document.getElementsByClassName('input')[0].value = ''
        if(map.get(e.target.innerHTML) === undefined){
        alert('Not found')
        }
        else{
        setArrayOfSymbol([...arrayOfSymbol, e.target.innerHTML])
        }
      }

    useEffect(() => {
     
      },[searchGrow, searchResult])
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
      }, 10000)

    const sideChild = map ? arrayOfSymbol.map((key) => {
        
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
        )}) : <div className="loader"></div>
      
      // console.log(searchResult.map(el => console.log(el)))
    const searchContent = searchResult.length > 0 ? searchResult.map((el) => {
          return(
              <li className='searchResult' value={el} onClick={addList}>{el}</li>
          )
    }) : <li className='searchResult'>Result not found</li>

    return(
        <React.Fragment>
        <div className = 'onSearching' data-type={searchGrow}>{searchContent}</div>
        <div className='sideChildTop'>
        <div className='sideChildTopUp'>
            <div className = 'searchBar' data-type={`${searchGrow}`}>
              <input className = 'input' placeholder='Search...' onChange={typing} ></input>
            </div>
            {/* <button className='addButton' onClick={add}> Add </button> */}
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
      </React.Fragment>
    )
}

export default SideTable