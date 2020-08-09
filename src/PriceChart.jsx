/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import "./PriceChart.css";
import { useInterval, findLocalMaxMin } from "./helper";
function PriceChart(props) {
  const chartContainerRef = useRef();
  const resizeObserver = useRef();
  const chart = useRef();
  const [count, setCount] = useState(0);
  const [candleSeries, setCandleSeries] = useState();
  const [lineSeries, setLineSeries] = useState();
  const [movingAverage, setMovingAverage] = useState()
  const [symbol, setSymbol] = useState('BTCUSDT')
  const [time, setTime] = useState('1m') 
  const [trend, setTrend] = useState()
  const [position, setPosition] = useState()
  const [price, setPrice] = useState(0)
  function setData(e){
    e.preventDefault()
    setSymbol(e.target.value)
  }
  function changeTime(e){
    e.preventDefault()
    setTime(e.target.value)
  }
  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)"
      },
      grid: {
        vertLines: {
          color: "#334158"
        },
        horzLines: {
          color: "#334158"
        }
      },
      priceScale: {
        borderColor: "#485c7b"
      },
      timeScale: {
        borderColor: "#485c7b",
        rightOffset: 12,
        barSpacing: 3,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        visible: true,
        timeVisible: true,
        secondsVisible: false
      },
      crosshair: {
        mode: CrosshairMode.Normal
      }
    });
    setCandleSeries(
      chart.current.addCandlestickSeries({
        priceScaleId: "right",
        scaleMargins: {
          top: 0.1,
          bottom: 0.3
        }
      })
    );
    setMovingAverage(
      chart.current.addLineSeries({
        color: '#eefa41',
        lineStyle: 0,
        lineWidth: 2,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 2,
        lineType: 2,
        })
    )
    setLineSeries(
      chart.current.addLineSeries({
      color: '#f48fb1',
      lineStyle: 0,
      lineWidth: 2,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 2,
      lineType: 2,
      })
    )
    // setClientWidth(window.innerWidth);
    // console.log(chart.current)
    // console.log(chartContainerRef.current.clientWidth)
    // console.log(chartContainerRef.current.clientHeight)
    return () => {
      chart.current.remove()  
    }
  }, []);

  useInterval(() => {
    const getData = async () => {
      let response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${time}`
      );
      let data = await response.json();
      return data;
    };
    getData()
      .then(res =>
        res.map(d => {
          return {
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4])
          };
        })
      )
      .then(res => {
        candleSeries.setData(res);
        return res;
      })
      //handle data here
      .then(res => {
        //for loop to create multiple line 
        var lineData = []
        var val = []
        var sum = []
        var low = []
        var map = new Map()
        for (let i = 0; i < res.length; i ++){
            val.push(parseFloat(res[i].high))
            low.push(parseFloat(res[i].low))
        }
        for (let j = 0; j < val.length-200; j++){
          var result = 0
          for(let k = j; k < j+200; k ++){
            result += val[k]
          }
          sum.push(result/200)
        }
        for(let i = 200, j = 0; i < res.length; i++, j++){
            lineData.push({
              time: res[i].time,
              value: sum[j]
            })
        }
        for(let i = 0; i < lineData.length; i++){
              map.set(lineData[i].time, lineData[i].value)
        }
        movingAverage.setData(lineData)
        // if(value === 200){
          for(var i = 200, j = 0; i < res.length; i++, j++){
            if(low[i] <= sum[j]){
              setPrice(low[i])
            }
          }
        
        // console.log(map, maxMin)
        var maxMin = findLocalMaxMin((res))
        var a = maxMin[maxMin.length-1].value
        var b = map.get(maxMin[maxMin.length-1].time)
        if(a < b){
          setTrend('Down Trend')
          setPosition('Sell')
        }
        else{
          setTrend('Up Trend')
          setPosition('Buy')
        }
        setCount(Math.max(...val))
        lineSeries.setData(maxMin)
      });
  }, 1000);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver(e => {
      // console.log(e)
      const { width, height } = e[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });
    resizeObserver.current.observe(chartContainerRef.current);
    return () => resizeObserver.current.disconnect();
  }, []);


  return (
    <React.Fragment> 
      <div className = 'mainTop'>
      <div className = 'buttonHolder'>
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
      </div>
      <div className = 'mainTopLeft'>
         Viewing <span className='symbol'>{symbol}</span> on <span className = 'symbol'>{time}</span> time frame <br></br> Highest price <span className="symbol">{count}</span>
      </div>
      <div className = 'mainTopRight'> Tips: <span className='symbol'>{symbol}</span> is now <span className="trend" data-type={`${position}`}>{trend}</span>. <br></br>You can place <span className="trend" data-type={`${position}`}>{position}</span> order at <span className="symbol">{price}</span> </div>
      </div>
      <div className="priceChart" ref={chartContainerRef}></div>
    </React.Fragment>
  );
}

export default PriceChart;
