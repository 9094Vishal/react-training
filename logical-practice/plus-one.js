//leetcode.com/problems/plus-one/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
leetcode: https: solution: var plusOne = function (digits) {
  const number = Number(digits.join("")) + 1;
  let list = [];
  for (let num of number.toString()) {
    list.push(Number(num));
  }
  return list;
};
