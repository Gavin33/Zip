// This is how I found the invalid zip ranges.
// Doesn't really do anything for the app.
// also the import code doesn't work anymore because I'm using invalidZip to test something else
// some misc code that I ran for some zips that the original algorithm missed:

  /*     for (let i = 0; i < zipRangesEnd.length - 1; i++) {
      const range = [
        zipRangesEnd[i][zipRangesEnd[i].length - 1],
        zipRangesStart[i + 1][0],
      ];
      console.log(range);
    } */
/*   const range = [
    ['01348', '01348'],
    ['02091', '02107'],
    ['03080', '03083'],
    ['04365', '04400'],
    ['05256', '05256'],
    ['06499', '06500'],
    ['07629', '07629'],
    ['08692', '08700'],
    ['09462', '09467'],
    ['10568', '10575'],
    ['12030', '12034'],
    ['12988', '12991'],
    ['14022', '14046'],
    ['14875', '14888'],
    ['15785', '15820'],
    ['16626', '16628'],
    ['17704', '17719'],
    ['18513', '18516'],
    ['19458', '19461'],
    ['20320', '20331'],
    ['21011', '21016'],
    ['21839', '21848'],
    ['22658', '22662'],
    ['23425', '23428'],
    ['24247', '24249'],
    ['24837', '24841'],
    ['25284', '25300'],
    ['25912', '25914'],
    ['26441', '26446'],
    ['27131', '27154'],
    ['28003', '28008'],
    ['29057', '29060'],
    ['29806', '29811'],
    ['30640', '30644'],
    ['31813', '31819'],
    ['32698', '32705'],
    ['33535', '33546'],
    ['34466', '34486'],
    ['35595', '35608'],
    ['36614', '36620'],
    ['37603', '37613'],
    ['38243', '38252'],
    ['39099', '39112'],
    ['39860', '39865'],
    ['40545', '40549'],
    ['41172', '41178'],
    ['41761', '41765'],
    ['42568', '42628'],
    ['43568', '43600'],
    ['44279', '79400'],
    ['80484', '80496'],
    ['81659', '82004'],
    ['83351', '83400'],
    ['84727', '84748'],
    ['87054', '87058'],
    ['88302', '88313'],
    ['90613', '90629'],
    ['91779', '91783'],
    ['92597', '92601'],
    ['93600', '93617'],
    ['94902', '94911'],
    ['95700', '95702'],
    ['96504', '96509'],
    ['97353', '97356'],
    ['98254', '98265'],
    ['99142', '99145'],
  ];
  let ranges = [];
  for (let i = 0; i < range.length; i++) {
    const start = invalidZip.findIndex((zip) => zip === range[i][0]);
    const end = invalidZip.findIndex((zip) => zip === range[i][1]);
    if (start === end) {
      continue
    }
    for (let j = start + 1; j < end + 1; j++) {
      if (invalidZip[j] != parseInt(invalidZip[j - 1], 10) + 1) {
        ranges.push([invalidZip[j - 1], invalidZip[j]]);
      }
    }
  }
  const start = []
  for (let i = 0; i < 67; i++) {
    start.push([])
  }
  const end = []
  for (let i = 0; i < 67; i++) {
    end.push([])
  }
  for (let i = 0; i < ranges.length; i++) {
    for (let j = 0; j < zipRangesStart.length; j++) {
      const input = ranges[i][0]
      if (input > zipRangesStart[j][zipRangesStart[j].length - 1] && input < zipRangesStart[j + 1][0]) {
        start[j].push(input)
        break
      }
    }
  }
  for (let i = 0; i < ranges.length; i++) {
    for (let j = 0; j < zipRangesEnd.length - 1; j++) {
      const input = ranges[i][1]
      if (input > zipRangesEnd[j][zipRangesEnd[j].length - 1] && input < zipRangesEnd[j + 1][0]) {
        end[j].push(input)
        break
      }
    }
  }
  console.log(start)
  console.log(end)
  return false; */
let invalidZip = require('./invalidZip.js');

// if the pivot isn't equal to zip, there must be
// a skip somewhere in between start and pivot.

// 0, 1, 2, 3, 4, 5, 6
//         x
// 0, 2, 4, 6, 7, 9, 10

// first find the first skip
// abnormalities mean skip is < end
const findZip = (zipLength, start) => {
  let skip = [-1];
  let pivot = 1;
  let end = start;
  let skips = 0;
  let days = 'infinite';
  while (
    invalidZip.invalidZip[pivot] != skip[skip.length - 1] &&
    pivot < zipLength &&
    skips < 50
  ) {
    do {
      // end = definite skip. start = -1 index of end. pivot = start
      // No skips possible at start

      const startZip = parseInt(invalidZip.invalidZip[start]) + 1;

      if (parseInt(startZip) !== parseInt(invalidZip.invalidZip[end])) {
        // find where the valid zips start
        skip.push(end - 1);
        // invalidZip.invalidZip[end] = end
      }
      start = end;
      end = zipLength;
      pivot = Math.floor((start + end) / 2);
      days = 'infinite';
      // console.log(skip)
      // console.log(skip.map((i) => invalidZip.invalidZip[i]));
      do {
        if (parseInt(invalidZip.invalidZip[pivot]) !== pivot) {
          end = pivot;
          const newPivot = Math.floor((pivot + start) / 2);
          if (days === 'numbered') {
            break;
          }
          if (newPivot === start && pivot + 1 !== end) {
            pivot++;
            days = 'numbered';
          } else {
            pivot = newPivot;
          }
        }
        // if zip is equal to zip, no skip, disregard everything before
        else {
          start = pivot;
          if (days === 'numbered') {
            break;
          }
          pivot = Math.floor((pivot + end) / 2);
        }
      } while (end !== start + 1 && pivot > 1 && pivot != zipLength);
    } while (skip.length < 101 && pivot != zipLength);
    // get rid of extra items inserted to make code run properly
    skip.splice(0, 2);
    console.log(skip.map((i) => invalidZip.invalidZip[i]));
    skip = [-1];
    skips++;
  }
  return skip;
};
findZip(57319, 44279);