import React, { useState } from "react";

import "./styles/styles.css";

import Timer from './Timer.jsx';

// class App extends Component{
//   render(){
//     return(
//       <div className="App">
//         <h1> pomodoro timer </h1>
//       </div>
//     );
//   }
// }

// (1) set up timer
  // (a) create a dispaly for the timer 
  // (b) start timer button 
  // (c) the counting functionality (timer that moves) 
  // (d) create a post request to talk to the back-end -> (2)
// (2) if the "current timer / name" exists in the back-end database, save the time (number of mins & secs)
// (3) if it doesn't exist, then we'll save this current timer to the back-end database [name, time]
  // (a) create a fetch request to create a preset timer on the side?

const App = () => {

  return (
    <div className="App">
        <h1 style={{textAlign: "center"}}> Pomodoro Timer </h1>
      <Timer />
    </div>
  )
}

export default App;