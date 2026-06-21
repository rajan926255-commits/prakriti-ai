import '@testing-library/jest-dom';
import React from 'react';

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  
  const AnimatePresence = ({ children }: { children: React.ReactNode }) => children;
  AnimatePresence.displayName = 'AnimatePresence';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionDiv = React.forwardRef((props: any, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { initial, animate, exit, transition, ...rest } = props;
    return React.createElement('div', { ref, ...rest });
  });
  MotionDiv.displayName = 'MotionDiv';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionCircle = React.forwardRef((props: any, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { initial, animate, exit, transition, ...rest } = props;
    return React.createElement('circle', { ref, ...rest });
  });
  MotionCircle.displayName = 'MotionCircle';

  return {
    __esModule: true,
    ...actual,
    AnimatePresence,
    motion: {
      ...actual.motion,
      div: MotionDiv,
      circle: MotionCircle,
    },
  };
});
