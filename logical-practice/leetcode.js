// leetcode : https://leetcode.com/problems/word-break/?envType=problem-list-v2&envId=string

// not solution:
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  let answer = wordDict
    .map((item) => s.includes(item))
    .join("")
    .includes(false);

  return answer ? false : true;
};

// // leetcode : https://leetcode.com/problems/plus-one/description/

// /**
//  * @param {number[]} digits
//  * @return {number[]}
//  */
// var plusOne = function (digits) {
//   let number = BigInt(digits.join(""));
//   number++;
//   let list = [];
//   for (let num of number.toString()) {
//     list.push(Number(num));
//   }
//   return list;
// };

// leetCode:

// not solved

var combinationSum = function (candidates, target) {
  let ans = [],
    list = candidates.sort(),
    last = 0,
    j;
  for (let i = 0; i < list.length; i++) {
    const sub = target - list[i];

    last = list[i];
    if (list[i] == 1) {
      ans.push(new Array(target).fill(1));
    }
    if (target % list[i] == 0) {
      ans.push(new Array(target / list[i]).fill(list[i]));
    }

    if (list.includes(sub)) {
      if (!ans.join(",").includes([last, sub].reverse())) ans.push([last, sub]);
      j = 0;
      getSum(list[j], target);
    } else {
      j = 0;
      getSum(list[j], target);
    }
  }

  function getSum(value, goal) {
    const sub = goal - value;

    if (list.includes(sub)) {
      if (last + value + sub == target) ans.push([last, sub, value]);
    }
    if (!(j >= list.length - 1)) {
      j++;
      return getSum(list[j], sub);
    }
  }

  return ans;
};
