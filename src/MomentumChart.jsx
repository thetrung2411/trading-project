import React from 'react'
import { createChart } from "lightweight-charts"; 
function MomentumChart(props){
    // const chart = createChart(document.getElementById('momentumChart'), { width: 750, height: 500 });
    console.log(props.data)
    return(
        <div id='momentumChart'></div>
    )
}

export default MomentumChart