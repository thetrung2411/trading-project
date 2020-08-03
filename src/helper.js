import {useEffect, useRef} from 'react'

export function useInterval(callback, delay){
    const savedCallback = useRef()
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])
    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if(delay != null){
            let id = setInterval(tick,delay);
            return () => clearInterval(id)
        }
    },[delay])
}

export function findLocalMaxMin(res){
        var arr = []
        var arr1 = []
        for(let i of res){
          arr.push({time: i.time, value: i.low})
          arr1.push({time: i.time, value: i.high})
        }
        var filter = []
        var filter2 = []
        var filter3 = []
        var filter4 = []
        for(let i = 1; i < arr.length-2 ; i++){
          if(arr[i].value < arr[i-1].value && arr[i].value < arr[i+1].value)  
             filter.push({time: arr[i].time, value: arr[i].value})
          if(arr1[i].value > arr1[i-1].value && arr1[i].value > arr1[i+1].value)  
            filter3.push({time: arr1[i].time, value: arr1[i].value})
        }
        for(let i = 1; i < filter.length-2 ; i++){
          if(filter[i].value < filter[i-1].value && filter[i].value < filter[i+1].value)  
             filter2.push({time: filter[i].time, value: filter[i].value})
          if(arr1[i].value > arr1[i-1].value && arr1[i].value > arr1[i+1].value)  
            filter4.push({time: arr1[i].time, value: arr1[i].value})
        }
        // console.log(filter2)
        return filter
}

export function movingAverage(){

}