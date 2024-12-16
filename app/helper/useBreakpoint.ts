import { useState, useEffect } from 'react';
import _throttle from 'lodash/throttle';

const getDeviceConfig = (width: number) => {
  if (width < 320) {
    return  "xs"
  } else if (width >= 320 && width < 720) {
    return 'sm';
  } else if (width >= 720 && width < 1024) {
    return 'md';
  } else if (width >= 1024) {
    return 'lg';
  } else {
    return 'lg';
  }
};

export const useBreakpoint = size => {
  const [brkPnt, setBrkPnt] = useState(getDeviceConfig(window.innerWidth));

  const calcInnerWidth = _throttle(function () {
    setBrkPnt(getDeviceConfig(window.innerWidth));
    // @ts-ignore
  }, 200);

  useEffect(() => {
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, [size]);

  return brkPnt;
};
export default useBreakpoint;
