export const generatorYear = () => {
  let year = new Date().getFullYear();
  let years = [];
  for (let i = year - 10; i <= year; i++) {
    years.push(i);
  }
  return years;
};
