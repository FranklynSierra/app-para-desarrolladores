

export const makeDate = (date) => {
  const index = date.indexOf('T');
  const newDate = date.slice(0, index)
  return newDate
}

