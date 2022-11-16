'use strict';

class View {
  constructor() {
    this.clear = document.querySelector('.js-clear');
    this.calculate = document.querySelector('.js-calculate');
    this.operators = document.querySelector('.js-operators');
    this.numbers = document.querySelector('.js-numbers');
    this.display = document.querySelector('.js-display');
  }

  bindHandleClear(handle) {
    this.clear.addEventListener('click', handle);
  }

  bindHandleCalculate(handle) {
    this.calculate.addEventListener('click', handle);
  }

  bindHandleOperators(handle) {
    this.operators.addEventListener('click', handle);
  }

  bindHandleNumbers(handle) {
    this.numbers.addEventListener('click', handle);
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
    this.view.bindHandleClear(this.handleClear);
    this.view.bindHandleCalculate(this.handleCalculate);
    this.view.bindHandleOperators(this.handleOperators);
    this.view.bindHandleNumbers(this.handleNumbers);
  }

  handleClear = (e) => {
    this.model = new Model();

    this.view.updateDisplay(this.model.displayValue);
    console.table(this.model);
  };

  handleCalculate = (e) => {
    if (!this.model.x || !this.model.y || !this.model.operator) {
      return;
    }
    const x = this.makeInt(this.model.x);
    const y = this.makeInt(this.model.y);
    this.model.result = this.model.calculate(x, y, this.model.operator);
    this.model.clear('x', 'y', 'operator');
    this.model.storeNumber('x', this.model.result);

    this.model.storeDisplayValue(this.model.result);
    this.view.updateDisplay(this.model.displayValue);
    console.table(this.model);
  };

  handleOperators = (e) => {
    if (this.model.x || this.model.y || this.model.operator) {
      this.handleCalculate();
    } else {
      this.model.clear('displayValue');
      this.view.updateDisplay(this.model.displayValue);
    }

    this.model.storeOperator(e.target.value);

    console.table(this.model);
  };

  handleNumbers = (e) => {
    if (!this.model.operator) {
      this.model.storeNumber('x', e.target.value);
    } else {
      this.model.storeNumber('y', e.target.value);
    }

    this.model.storeDisplayValue(this.model.x);
    this.view.updateDisplay(this.model.displayValue);
    console.table(this.model);
  };

  checkIsInt(value) {
    return Number.isInteger(parseInt(value));
  }

  makeInt(value) {
    return parseInt(value);
  }
}

class Model {
  constructor() {
    this.x = '';
    this.y = '';
    this.operator = '';
    this.result = '';
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
    return this[operator](x, y).toFixed(2);
  }

  storeNumber(name, value) {
    this[name] += value;
  }

  storeOperator(operator) {
    this.operator = operator;
  }

  storeDisplayValue(displayValue) {
    this.displayValue = displayValue;
  }

  clear(...args) {
    for (let i = 0; i < args.length; i += 1) {
      this[args[i]] = '';
    }
  }
}

const app = new Controller(new Model(), new View());
