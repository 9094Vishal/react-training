// leetcode: //leetcode.com/problems/median-of-two-sorted-arrays/?envType=problem-list-v2&envId=array
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
https: solution: var findMedianSortedArrays = function (nums1, nums2) {
  let newArr = new Array(nums1, nums2).flat();
  newArr.sort((a, b) => a - b);
  let index = newArr.length;
  if (index == 1) {
    return newArr[index - 1];
  }

  if (index % 2 == 0) {
    const p1 = newArr[index / 2 - 1],
      p2 = newArr[index / 2];

    return (p1 + p2) / 2;
  } else {
    return newArr[Math.floor(index / 2)];
  }
};
