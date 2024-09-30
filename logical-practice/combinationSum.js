// leetcode : https://leetcode.com/problems/combination-sum/?envType=problem-list-v2&envId=array

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const ans = [];
  candidates.sort((a, b) => a - b);

  function backtrack(start, currentCombination, currentSum) {
    if (currentSum === target) {
      return;
    }

    if (currentSum > target) {
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      currentCombination.push(candidates[i]);
      backtrack(i, currentCombination, currentSum + candidates[i]);
      currentCombination.pop();
    }
  }

  backtrack(0, [], 0);
  return ans;
};
