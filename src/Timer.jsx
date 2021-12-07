import React, { useState } from 'react';
import { useCountdownTimer } from 'use-countdown-timer';
import humanReadable from './humanReadable';
import Presets from './Presets.jsx';
import './styles/styles.css';

const Timer = () => {
  // states
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [timerLabel, setTimerLabel] = useState('');
  const [user, setUser] = useState('');
  const [timerList, setTimerList] = useState([]);

  console.log('hour, min, sec:', hour, min, sec);
  const hourToMS = 60 * 60 * 1000;
  const minToMS = 60 * 1000;
  const secToMS = 1 * 1000;
  
  const setDuration = hour * hourToMS + min * minToMS + sec * secToMS; // in ms
  
  console.log('initial set duration: ', setDuration);

  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    // timer sets the countdown
    timer: setDuration, // in ms
  });
  
  const changeStateInChild = (e) => {
    console.log('this is the SS', Number(e.target.getAttribute('data-seconds')));
    console.log('this is the MM', Number(e.target.getAttribute('data-minutes')));
    console.log('this is the HH', Number(e.target.getAttribute('data-hours')));
    setSec(() => Number(e.target.getAttribute('data-seconds')));
    setMin(() => Number(e.target.getAttribute('data-minutes')));
    setHour(() => Number(e.target.getAttribute('data-hours')));
    reset();
  }

  // duration in seconds
  let duration = countdown / 1000; // in seconds
  console.log('duration: ', duration, 'seconds, ', humanReadable(duration)[3]);

  // user input timer (later on should merge w timer display)
  const timerInput = () => {
    return (
      <form>
        <div id="notation">
          <input id="HH" name="HH_val" type="number" minLength="2" maxLength="2" value={hour}
            onChange={(e) => { setHour(e.target.value) }} />:
          <input id="MM" name="MM_val" type="number" minLength="2" maxLength={2} value={min}
            onChange={(e) => { setMin(e.target.value) }} />:
          <input id="SS" name="SS_val" type="number" minLength="2" value={sec}
            onChange={(e) => { setSec(e.target.value) }} />
        </div>
      </form>
    )
  };
  
  // display timer only
  const timerDisplay = () => {
    return (<div id="notation">{humanReadable(duration)[3]}</div>)
  };

  // can we make it dynamic? 
  const dynamicDisplay = () => {
    if (!isRunning || duration === 0) {
      return timerInput();
    } else {
      return timerDisplay();
    }
  };

  // (isRunning || duration !== setDuration)
  
  // timer pop up
  if (duration === 0) {
  document.getElementById('aaron').play();
  alert('Times up!');
}

  // preset timers list
  const list = [];
  for (let i = 0; i < timerList.length; i++){
    list.push(<Presets label={timerList[i].timerLabel} duration={timerList[i].timerDuration} onClick={changeStateInChild}/>);
  };

  return (
    <div id="container">
      {/* login */}
      <form>
        {/* if user is not logged in, login button appears. */}
        {/* if user is logged in, logout button appears. */}
        <input type="text" id='user' placeholder="Username" onChange={(e) => {setUser(e.target.value)}}/>
        <button type="button" id="loginButton" onClick={() => {
          // post request to send the data to the backend here
          console.log(user);
          fetch ('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName: user})
          }).then(res => res.json())
            .then(data => {
              console.log(data);
              setTimerList(data);
            });
          }}>Login
        </button>
        <br />
        <br />
      </form>
      
      {/* input fields */}
      <form>
        <input type="text" id='timer-label' placeholder="Name me!" value={timerLabel} onChange={(e) => { setTimerLabel(e.target.value) }} />
      </form>

      {/* countdown timer for user input */}
      {/* <form>
        <div id="notation">
          <input id="HH" name="HH_val" type="number" minLength={2} maxLength="2" value={hour} onChange={(e) => {setHour(e.target.value)}}/>:
          <input id="MM" name="MM_val" type="number" minLength="2" maxLength={2} value={min} onChange={(e) => {setMin(e.target.value)}}/>:
          <input id="SS" name="SS_val" type="number" minLength="2" value={sec} onChange={(e) => {setSec(e.target.value)}} />
        </div>
      </form> */}
      
      {/* countdown timer for display  */}
      <div id="notation">{humanReadable(duration)[3]}</div>
      
      {/* reset button 
      (later on maybe will emove the reset button) */}
      {/* {!isRunning || seconds === 0 ? timerInput() : timerDisplay()} */}

      {/* {dynamicDisplay()} */}

      <br />
      <br />

      

      {/* dynamic start / pause button! */}
      {isRunning ? (
        <button id="pauseButton" onClick={pause} >Pause</button>
      ) : (
        <button id="startButton" onClick={start} >Start</button>
      )}

      <br />
      <div id="set-time">
      <form>
        <label htmlFor="HH_i"> Hour: </label>
        <input type="number" id="HH_i" placeholder="HH" onChange={(e) => {setHour(e.target.value)}}/>
        <label htmlFor="MM_i"> Minute: </label>
        <input type="number" id="MM_i" placeholder="MM" maxLength={3} onChange={(e) => {setMin(e.target.value)}}/>
        <label htmlFor="SS_i"> Second: </label>
        <input type="number" id="SS_i" placeholder="SS" onChange={(e) => {setSec(e.target.value)}}/>
      </form>
      <button id="resetButton" onClick={reset}>Set</button>
      </div>
      <br />
      <br />
      
      {/* save button: send data to the backend */}
      <button type="button" id="saveButton" onClick={() => {
        // post request to send the data to the backend here
        fetch ('/timer', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({label: timerLabel, dur: setDuration})
        }).then(res => res.json())
          .then(data => {
            console.log(data);
            setTimerList(data);
          });
      }}>Save</button>

      {/* list of presets (once logged in) */}
      <div id="saved-presets">
        {list}
      </div>
    </div>
  );
};

export default Timer;