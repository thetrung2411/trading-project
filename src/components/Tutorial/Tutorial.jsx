import React, { useEffect} from "react";
import "./Tutorial.css";

function Tutorial(){
    var index = 0;
    function hideTutorial() {
        document.getElementsByClassName("tutorial")[0].style.display = "none";
      }
      function slideShow() {
        var slides = document.getElementsByClassName("tutorialMiddle");
        if (index >= slides.length) {
          index = 0;
        }
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        slides[index].style.display = "block";
        index++;
      }
useEffect(() => {
        slideShow();
    })
        return (
              <div className="tutorial">
                <div className="tutorialMiddle">
                  <h1>Welcome to my trading application</h1 >
                  <h3>This short tutorial will walk you through all of the features of this application.</h3>
                  <p>If you want to dive in right away, simply click the skip button</p>
                </div>
                <div className="tutorialMiddle">
                  <h1>What is this application?</h1>
                  <h3>The application will analyse the trend of the market based on the mean price and then give tips to buy or sell</h3> 
                  <p>The <span className='cc'>candle chart</span> is used to display price of each coin based on different given time period</p>
                  <p>The <span className='yl'>yellow line</span> is the 200 Moving Average which calculate the average price of nearest 200 trading period</p>
                  <p>The <span className='pl'>pink line </span> will map all the local price minimum to find the pattern of the chart that going to be used to predict the trend of the market.</p>
                </div>
                <div className="tutorialMiddle">
                  <h1>How to use this application?</h1>
                  <h3>Managing time frame</h3>
                  <p>Choose the time frame you want to display by clicking on the time on the top left corner of the chart</p>  
                  <h3>Searching for coin</h3>
                  <p>Search for the coin you want to display by simply typing on the search bar on the right hand side</p>
                  <h3>Change price chart</h3>
                  <p>Click on any coin symbol at the right hand side to change the coin you want for the further details</p>
                </div>
               
                
                <div className="tutorialBottom">
                  <button onClick={hideTutorial}>Skip</button>
                  <button onClick={slideShow}>Next</button>
                </div>
              </div>
    )
}
export default Tutorial