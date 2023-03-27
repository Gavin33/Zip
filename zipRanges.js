const zipRanges = (rangeStart, rangeEnd) => {
  const ranges = [];
  for (let i = 0; i < 67; i++) {
    const end = rangeEnd[i];
    const start = rangeStart[i];
    const section = [];
    for (let j = 0; j < end.length; j++) {
      section.push([start[j], end[j]]);
    }
    ranges.push(section);
  }
  function downloadObjectAsJson(exportObj, exportName) {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  downloadObjectAsJson(ranges[66], 'ranges');
  return ranges;
};

export default zipRanges;
