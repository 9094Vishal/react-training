// /**
//  * @param {string} s
//  * @return {number}
//  */
// var calculate = function (s) {
//   function evaluateExpression(expr) {
//     return new Function("return " + expr)();
//   }

//   function simpleEvaluate(expr) {
//     // Basic implementation using regex to handle numbers and operators
//     const tokens = expr.match(/(\d+|\+|\-|\*|\/)/g);
//     // You can implement a more robust evaluation logic here
//     return Function('"use strict";return (' + tokens.join(" ") + ")")();
//   }

//   console.log(evaluateExpression("(1+(4+5+2)-3)+(6+8)"));
// };

var calculate = function (expression) {
  let stack = [];
  let result = 0;
  let sign = "+";
  let num = "0";

  for (let e of expression) {
    if (e === " ") {
      continue;
    } else if (e === "+" || e === "-" || e === "*" || e === "/") {
      result = calc(result, sign, num);
      sign = e;
      num = "0";
    } else if (e === "(") {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = "+";
    } else if (e === ")") {
      num = calc(result, sign, num).toString();
      sign = stack.pop();
      result = stack.pop();
    } else {
      num += e;
    }
  }

  return calc(result, sign, num);
};

function calc(a, sign, bStr) {
  let b = parseInt(bStr);
  switch (sign) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    default:
      return a / b;
  }
}

console.log('calculate("1+1"): ', calculate(" 2-1 + 2 "));
