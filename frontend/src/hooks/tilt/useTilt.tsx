import { createRef, RefObject, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

const useTilt = (arrayData: Array<any>, options: any) => {
  //vanilla tiltのセットアップ
  const tiltRefs = useRef<RefObject<any>[]>(arrayData.map(() => createRef()));
  arrayData.forEach((_, index) => {
    tiltRefs.current[index] = createRef<any>();
  })
  useEffect(() => {
    for (let i = 0; i < arrayData.length; i++) {
      if (tiltRefs.current[i].current) {
        VanillaTilt.init(tiltRefs.current[i].current, options);
      }
    }
  }, [options, arrayData, tiltRefs.current]);
  return { tiltRefs }
}

export default useTilt;