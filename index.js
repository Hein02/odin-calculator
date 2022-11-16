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
  clearData: function () {
    this.x = '';
    this.y = '';
    this.operator = '';
  },
  clearCache: function () {
    this.cache = '';
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
    data.storeNum(value);

    data.storeCache(value);
  } else {
    data.storeOperator(value);

    data.clearCache();
  }

  if (data.x && data.y && data.operator) {
    const x = makeInt(data.x);
    const y = makeInt(data.y);
    data.result = calculator.operate(x, y, data.operator);
    data.clearData();
    data.storeNum(data.result);
  }

  if (data.result) {
    display.textContent = data.result;
  } else {
    display.textContent = data.cache;
  }

  console.table(data);
}

const numpad = calculator.getEl('.js-numpad');
const display = calculator.getEl('.js-display');
calculator.addEvt(numpad, 'click', handleClick);
