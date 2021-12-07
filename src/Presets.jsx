import React, { useState } from 'react';
import humanReadable from './humanReadable';
import Timer from './Timer.jsx';

const Presets = ({ label, duration, onClick }) => {
    const seconds = duration / 1000;
    return (
      <div id="saved-presets">
        <br />
        <button id="presets" onClick={onClick} data-seconds={humanReadable(seconds)[0]} data-minutes={humanReadable(seconds)[1]} data-hours={humanReadable(seconds)[2]}>
            {label} <br/>
            {humanReadable(seconds)[3]}
        </button>
        <br />
        <br />
      </div>

    )
}

export default Presets;