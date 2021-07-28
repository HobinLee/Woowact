export const checkSame = (jsonA: {}, jsonB: {}): boolean => {
  return jsonA.toString() === jsonB.toString();
};
