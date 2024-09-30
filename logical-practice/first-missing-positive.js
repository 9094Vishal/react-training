/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  nums.sort((a, b) => a - b);
  if (nums.length == 0) {
    return 1;
  }

  ans = 1;
  nums = nums.filter(function (x) {
    return x > 0;
  });
  const min = Math.min(...nums);
  //   console.log(nums);

  if (min >= 2) {
    ans = 1;
  } else {
    // getNum(nums, 0);
    for (let i = 0; i < nums.length; i++) {
      //   console.log(nums[i + 1], nums[i], nums[i + 1] - nums[i]);
      const sub = nums[i + 1] - nums[i];
      if (sub >= 2) {
        if (!nums.includes(sub)) {
          ans = nums[i] + 1;
        } else ans = nums[i] + 1;
        break;
        //   console.log("nums[i]: ", nums[i]);
      } else {
        ans = nums[i] + 1;
      }
    }
  }
  function getNum(nums = [], i) {
    console.log("call");

    if (i == nums.length - 1) return;

    const sub = nums[i + 1] - nums[i];
    console.log(nums[i + 1], nums[i], nums[i + 1] - nums[i]);
    if (sub >= 2) {
      if (!nums.includes(sub)) {
        ans = nums[i] + 1;
      } else ans = nums[i] + 1;
      return;
      //   console.log("nums[i]: ", nums[i]);
    } else {
      ans = nums[i] + 1;
      i++;
      getNum(nums, i);
    }
  }

  console.log("answer", ans);
};
// firstMissingPositive([7, 8, 9, 11, 12]);
// firstMissingPositive([7, 8, 1, 2, 11, 12]);

// firstMissingPositive([3, 4, -1, 1]);
firstMissingPositive([1, 2, 0]);

// firstMissingPositive([100000, 3, 4000, 2, 15, 1, 99999]);
