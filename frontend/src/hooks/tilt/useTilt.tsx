import { createRef, RefObject, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { PostType } from '../../../types';

const useTilt = (arrayData: Array<PostType>, options: Object) => {
  //vanilla tiltのセットアップ
  const tiltRefs = useRef<RefObject<HTMLDivElement>[]>(arrayData.map(() => createRef()));
  arrayData.forEach((_, index) => {
    tiltRefs.current[index] = createRef<HTMLDivElement>();
  })
  useEffect(() => {
    tiltRefs.current.forEach((ref) => {
      if (ref.current) {
        VanillaTilt.init(ref.current, options);
      }
    });
  }, [options, arrayData, tiltRefs.current]);
  return { tiltRefs }
};

export default useTilt;