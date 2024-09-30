// leetcode : https://leetcode.com/problems/two-sum/?envType=problem-list-v2&envId=array
// solution:
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        if (i != j) {
          result.push(i, j);
          return result;
        }
      }
    }
  }
};
