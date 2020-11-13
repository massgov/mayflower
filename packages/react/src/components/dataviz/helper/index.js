const round = (number, precision) => {
  const shift = (reverseShift) => {
    const pre = reverseShift ? precision : -precision;
    const numArray = (`${number}`).split('e');
    return+(`${numArray[0]}e${numArray[1] ? (+numArray[1] + pre) : pre}`);
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
};

export default round;
