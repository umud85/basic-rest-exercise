export default function binaryIndexOf(stringArray, searchString, sortProp) {
  let start = 0;
  let end = stringArray.length - 1;
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    let valArray = stringArray[mid][sortProp].split(",");
    if (valArray.includes(searchString)) {
      return mid;
    }

    let compResult = searchString.localeCompare(stringArray[mid][sortProp]);

    if (compResult > 0) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}
