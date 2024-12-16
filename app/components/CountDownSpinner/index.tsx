import * as React from 'react';
import {FC, useEffect} from 'react';
import './countDown.scss'
type CountDownSpinnerProps = {};
const CountDownSpinner: FC<CountDownSpinnerProps> = () => {

  useEffect(() => {
    const countdownNumberEl = document.getElementById('time');
    let countdown = 10 * 60;
    countdownNumberEl!.textContent = '10:00';
    setInterval(function () {
      countdown = --countdown <= 0 ? 10 * 6 : countdown;
      countdownNumberEl!.textContent = `${countdown%60} : ${Math.floor(countdown/60)}` ;
    }, 1000);
  }, [])

  return (
    <div className="countdown">
      <div id="time" className="time"> </div>
      <svg viewBox="0 0 40 40" className="countDown__svg">
        <circle r="18" cx="20" cy="20"/>
      </svg>
    </div>
  );
};

export default CountDownSpinner;
