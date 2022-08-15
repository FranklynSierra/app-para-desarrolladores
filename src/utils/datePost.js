

export const makeDate = (date) => {
  const index = date.indexOf('T');
  const newDate = date.slice(0, index)
  return newDate
}

// makeDate('2009-07-31T05:40:46+0000')