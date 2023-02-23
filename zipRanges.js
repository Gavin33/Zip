const zipRanges = (rangeStart, rangeEnd) => {
  const ranges = [];
  for (let i = 0; i < 67; i++) {
    const end = rangeEnd[i];
    const start = rangeStart[i];
    const section = []
    for (let j = 0; j < end.length; j++) {
      section.push([start[j], end[j]]);
    }
    ranges.push(section)
  }
  return ranges
};

export default zipRanges