'use strict';

class View {
  constructor() {
    this.clear = document.querySelector('.js-clear');
    this.calculate = document.querySelector('.js-calculate');
    this.operators = document.querySelectorAll('.js-operators');
    this.numbers = document.querySelectorAll('.js-numbers');
    this.display = document.querySelector('.js-display');
    this.point = document.querySelector('.js-point');
  }

  bindHandle(node, handle) {
    if (this[node].length) {
      this[node].forEach((el) => el.addEventListener('click', handle));
    } else {
      this[node].addEventListener('click', handle);
    }
  }

  bindHandleClear(handle) {
    this.clear.addEventListener('click', handle);
  }

  bindHandleCalculate(handle) {
    this.calculate.addEventListener('click', handle);
  }

  bindHandleOperators(handle) {
    this.operators.forEach((operator) => {
      operator.addEventListener('click', handle);
    });
  }

  bindHandleNumbers(handle) {
    this.numbers.forEach((number) => {
      number.addEventListener('click', handle);
    });
  }

  bindHandlePoint(handle) {
    this.point.addEventListener('click', handle);
  }

  updateDisplay(value) {
    this.display.textContent = value;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
  }

  init() {
    this.view.bindHandle('clear', this.handleClear);
    this.view.bindHandle('calculate', this.handleCalculate);
    this.view.bindHandle('operators', this.handleOperators);
    this.view.bindHandle('numbers', this.handleNumbers);
    this.view.bindHandle('point', this.handlePoint);
  }

  handleClear = () => {
    this.model = new Model();
    this.updateDisplay();
  };

  handleCalculate = (e) => {
    const { value } = e.target;
    this.model.store('others', value);
    if (this.model.number) {
      this.assignNumber(this.model.number);
      this.model.clear('number');
    }
    this.calculateStoreDisplay(this.model.x, this.model.y, this.model.operator);
    console.table(this.model);
  };

  handleOperators = (e) => {
    const { value } = e.target;
    // If user presses on a number and '=' is used for previous calculation,
    // start a new calculation by storing the number in 'x'
    if (this.model.others === 'calculate' && this.model.number) {
      this.model.store('x', this.model.number);
      this.model.clear('y', 'others');
    } else {
      this.assignNumber(this.model.number);
    }
    this.updateDisplay(this.model.number);
    this.model.clear('number');
    // If a calculation can be done, do it first before storing the 'operator'
    this.calculateStoreDisplay(this.model.x, this.model.y, this.model.operator);
    this.model.store('operator', value);
    console.table(this.model);
  };

  handleNumbers = (e) => {
    const { value } = e.target;
    this.model.store('number', value);
    this.updateDisplay(this.model.number);
    console.table(this.model);
  };

  handlePoint = () => {
    if (this.model.number.includes('.')) return;
    if (!this.model.number) {
      this.model.store('number', '0.');
    } else {
      this.model.store('number', '.');
    }
    this.updateDisplay(this.model.number);
    console.table(this.model);
  };

  calculateStoreDisplay(x, y, operator) {
    if (!x || !y || !operator) return;
    const result = this.model.calculate(x, y, operator);
    this.model.store('x', result);
    this.updateDisplay(result);
  }

  updateDisplay(displayValue) {
    this.model.store('displayValue', displayValue);
    this.view.updateDisplay(this.model.displayValue);
  }

  // Store 'number' in an available operand
  assignNumber(number) {
    if (!this.model.x) {
      this.model.store('x', number);
    } else {
      this.model.store('y', number);
    }
  }

  checkIsInt(value) {
    return Number.isInteger(parseInt(value));
  }
}

class Model {
  constructor() {
    this.x = '';
    this.y = '';
    this.operator = '';
    this.number = '';
    this.others = '';
    this.displayValue = '';
  }

  add(x, y) {
    return x + y;
  }

  subtract(x, y) {
    return x - y;
  }

  multiply(x, y) {
    return x * y;
  }

  divide(x, y) {
    return x / y;
  }

  calculate(x, y, operator) {
    x = this.makeFloat(x);
    y = this.makeFloat(y);
    return this[operator](x, y).toFixed(2);
  }

  store(key, value) {
    if (key === 'number') {
      this[key] += value;
    } else {
      this[key] = value;
    }
  }

  clear(...args) {
    for (let i = 0; i < args.length; i += 1) {
      this[args[i]] = '';
    }
  }

  makeFloat(value) {
    return parseFloat(value);
  }
}

const app = new Controller(new Model(), new View());
