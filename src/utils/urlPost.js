export const makeUrlPost = (name) => {
  const url = name.toLowerCase().split(' ').join('-');
  return url;
}