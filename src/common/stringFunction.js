export const titleCase = (str) => {
  const newStr = str && str.charAt(0).toUpperCase() + str.slice(1);
  return newStr;
};
