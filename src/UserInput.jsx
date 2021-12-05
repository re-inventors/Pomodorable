import React, { useState } from "react";

const UserInput = () => {
  // let hourToMS = 60 * 60 * 1000;
  // let minToMS = 60 * 1000;
  // let secToMS = 1000;

  // const preset = {
  //   username: "ulrich",
  //   label: "favTimer",
  //   userMS: (userH * hourToMS) + (userM * minToMS) + (userS * secToMS)
  // }
  
  // SS = Math.floor(seconds % 60),
  // MM = Math.floor(seconds / 60) % 60, // use modulo to get only the remainder minutes
  // HH = Math.floor(seconds / 60 / 60);

  return (
    <div>
      <p>user input timer</p>
      <form id="inputStyling">
        <input type="number" id="HH_i" value={input} onInput={setHour(hour = e.target.value)}/>
        <input type="number" id="MM_i" value={input} onInput={setMin(min = e.target.value)}/>
        <input type="number" id="SS_i" value={input} onInput={setSec(sec = e.target.value)}/>
      </form>
      <button type="button" id="saveButton" onClick={() => {
        // post request to send the data to the backend here
      }}>Save</button>
    </div>
  );
}

export default UserInput;