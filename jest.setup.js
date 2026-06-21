import '@testing-library/jest-dom';

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  const React = require('react');
  return {
    __esModule: true,
    ...actual,
    AnimatePresence: ({ children }) => children,
    motion: {
      ...actual.motion,
      div: React.forwardRef((props, ref) => {
        const { initial, animate, exit, transition, ...rest } = props;
        return React.createElement('div', { ref, ...rest });
      }),
      circle: React.forwardRef((props, ref) => {
        const { initial, animate, exit, transition, ...rest } = props;
        return React.createElement('circle', { ref, ...rest });
      }),
    },
  };
});
