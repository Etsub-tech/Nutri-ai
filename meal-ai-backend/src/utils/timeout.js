// utils/timeout.js
export const withTimeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("AI service timeout")), ms)
    ),
  ]);
};
