export const checkSame = (jsonA: {}, jsonB: {}): boolean => {
  return JSON.stringify(jsonA) === JSON.stringify(jsonB);
};
