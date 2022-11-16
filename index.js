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
    return this[op](x, y);
  },
};

console.log(calculator.operate(2, 2, 'add'));

const data = {
  x: '',
  y: '',
  operator: '',
  result: '',
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

function makeView(o) {
  for (let i in view) {
    if (view.hasOwnProperty(i) && typeof view[i] === 'function') {
      o[i] = view[i];
    }
  }
}

makeView(calculator);

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
  } else {
    data.storeOperator(value);
  }

  if (data.x && data.y && data.operator) {
    const x = makeInt(data.x);
    const y = makeInt(data.y);
    data.result = calculator.operate(x, y, data.operator);
    data.clearData();
    data.storeNum(data.result);
  }

  console.table(data);
}

const numpad = calculator.getEl('.js-numpad');
const display = calculator.getEl('.js-display');
calculator.addEvt(numpad, 'click', handleClick);
