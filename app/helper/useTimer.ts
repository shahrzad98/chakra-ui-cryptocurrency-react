import { useEffect, useState } from 'react';

export function useTimer(start, timer) {
  // set initial state to be 59s
  const [count, setCount] = useState(timer);

  useEffect(() => {
    // given that we passed in the variable when the timer      should start we use it here
    if (start) {
      const secondsLeft = setInterval(() => {
        setCount(c => (c > 0 ? c - 1 : c));
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else return;
    // we keep track when to rerender the hook, aka when the start is changed to true
  }, [start]);

  return [count, setCount];
}
