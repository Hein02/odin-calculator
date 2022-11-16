'use strict';

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
  operate: function (x, y, op) {
    return this[op](x, y).toFixed(2);
  },
};

const data = {
  x: '',
  y: '',
  operator: '',
  result: '',
  cache: '',
  storeCache: function (value) {
    this.cache += value;
  },
  storeNum: function (num) {
    if (!this.operator) {
      this.x += num;
    } else {
      this.y += num;
    }
  },
  storeOperator: function (operator) {
    this.operator = operator;
  },

  clear: function (...args) {
    for (let i = 0; i < args.length; i += 1) {
      this[args[i]] = '';
    }
  },
};

const view = {
  getEl: function (selector) {
    const el = document.querySelector(selector);
    return el;
  },

  createEl: function (type, ...classNames) {
    const el = document.createElement(type);
    el.classList.add(...classNames);
    return el;
  },

  appendEl: function (parent, child) {
    return parent.appendEl(child);
  },

  addEvt: function (el, type, handler, ...opts) {
    el.addEventListener(type, handler, ...opts);
  },
};

function copyProps(to, from) {
  for (let i in from) {
    if (from.hasOwnProperty(i)) {
      to[i] = from[i];
    }
  }
}

function copyMethods(to, from) {
  for (let i in from) {
    if (from.hasOwnProperty(i) && typeof from[i] === 'function') {
      to[i] = from[i];
    }
  }
}

copyProps(calculator, data);
copyProps(calculator, view);

function checkIsInt(value) {
  return Number.isInteger(parseInt(value));
}

function makeInt(value) {
  return parseInt(value);
}

function handleClick(e) {
  const { value } = e.target;

  if (checkIsInt(value)) {
    calculator.storeNum(value);

    calculator.storeCache(value);
  } else if (value !== 'operate') {
    calculator.storeOperator(value);

    calculator.clear('cache');
  }

  if (calculator.x && calculator.y && calculator.operator) {
    const x = makeInt(calculator.x);
    const y = makeInt(calculator.y);
    calculator.result = calculator.operate(x, y, calculator.operator);
    calculator.clear('x', 'y', 'operator');
    calculator.storeNum(calculator.result);
  }

  if (calculator.result) {
    display.textContent = calculator.result;
  } else {
    display.textContent = calculator.cache;
  }

  if (value === 'clear') {
    calculator.clear('x', 'y', 'operator', 'result');
  }

  console.table(calculator);
}

const numpad = calculator.getEl('.js-numpad');
const display = calculator.getEl('.js-display');
calculator.addEvt(numpad, 'click', handleClick);
