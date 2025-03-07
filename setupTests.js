import '@testing-library/jest-dom/vitest';

global.IntersectionObserver = class {
  constructor(callback) {
    this.callback = callback;
    this.observe = () => {};
    this.unobserve = () => {};
    this.disconnect = () => {};
  }
};
