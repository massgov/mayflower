// eslint-disable-next-line import/prefer-default-export
export const countDecimals = (x) => {
  if (Math.floor(x) === x) return 0;
  return String(x).split('.')[1].length || 0;
};
