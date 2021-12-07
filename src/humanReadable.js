function humanReadable(seconds) {
  // output: string in the format of 'HH:MM:SS'

  // if input is less than 0
  if (seconds < 0) {
    return 'Please enter a positive number of seconds.';
  }
  if (seconds > 359999) {
    return `The number of seconds entered has exceeded the counter's range of display (00:00:00 to 99:59:59)`;
  }

  let SS = Math.floor(seconds % 60),
    MM = Math.floor(seconds / 60) % 60, // use modulo to get only the remainder minutes
    HH = Math.floor(seconds / 60 / 60);

  // return the format of 2 digits '00' to '59'
  const format = (time) => {
    return time > 9 ? time : String('0' + time);
  };

  let newSS = format(SS);
  let newMM = format(MM);
  let newHH = format(HH);

  return [SS, MM, HH,`${newHH}:${newMM}:${newSS}`];
}

export default humanReadable;