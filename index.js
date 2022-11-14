const calculator = {
  add: function (x, y) {
    return x + y;
  },
  substract: function (x, y) {
    return x - y;
  },
  multiply: function (x, y) {
    return x * y;
  },
  divide: function (x, y) {
    return x / y;
  },
  operate: function (x, y, operator) {
    return this[operator](x, y);
  },
};

console.log(calculator.operate(2, 2, 'add'));
