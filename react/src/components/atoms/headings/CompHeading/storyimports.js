let Compheading;
const getHeading = async () => {
 const { default: x } = await import('./index');
 Compheading = x;
 export default CompHeading.defaultProps;
};
const test = Promise.resolve(getHeading());
console.log(test);
console.log(Compheading);
