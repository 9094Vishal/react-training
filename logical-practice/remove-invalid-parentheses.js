/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
  let start = "";
  let end = "";
  let total = 0;

  let list = new Array(s.length).fill(")");
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") {
      list[i] = "(";
    }
  }
  console.log("list: ", list);
};
removeInvalidParentheses("()())()");
