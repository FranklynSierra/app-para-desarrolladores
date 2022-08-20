export const id = (name) => {
  const url = name.toLowerCase().split(' ').join('-');
  return url;
}