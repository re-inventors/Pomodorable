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

  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [milisec, setMilisec] = useState();
  return (
    <div>
      <p>user input timer</p>
      <form className="inputStyling">
        <input type="number" id="HH_i"/><input type="number" id="MM_i"/><input type="number" id="SS_i"/>
      </form>
      <button type="button" id="saveButton" onClick={() => {
        
      }}>Save</button>
    </div>
  );
}

export default UserInput;