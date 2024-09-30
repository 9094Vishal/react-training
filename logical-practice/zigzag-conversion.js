/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  const n = Math.floor(numRows / 2);
  const l = s.length;
  let p1 = "",
    p2 = "",
    p3 = "";
  for (let i = 0; i < l; i++) {
    if (i % 3 == 0) {
      p1 += s[i].toString();
    } else if (i % n == 0) {
      p2 += s[i].toString();
    } else p3 += s[i].toString();
  }
  return p1 + p2;
};

console.log("convert(PAYPALISHIRING): ", convert("PAYPALISHIRING", 3));
