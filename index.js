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
    this.view.bindHandleClear(this.handleClear);
    this.view.bindHandleCalculate(this.handleCalculate);
    this.view.bindHandleOperators(this.handleOperators);
    this.view.bindHandleNumbers(this.handleNumbers);
    this.view.bindHandlePoint(this.handlePoint);
  }

  handleClear = () => {
    this.model = new Model();
    this.onDisplayValueChanged();
  };

  handleCalculate = () => {
    let { x, y, operator } = this.model;
    if (!x || !y || !operator) {
      return;
    }
    x = this.makeFloat(x);
    y = this.makeFloat(y);
    const result = this.model.calculate(x, y, operator);

    this.model.clear('x', 'y', 'operator');
    this.model.store('x', result);
    this.model.store('result', result);

    this.model.store('displayValue', this.model.x);
    this.onDisplayValueChanged();

    console.table(this.model);
  };

  handleOperators = (e) => {
    const { value } = e.target;
    let { x, y, operator } = this.model;
    if (x || y || operator) {
      this.handleCalculate();
    } else {
      this.model.clear('displayValue');
      this.onDisplayValueChanged();
    }

    this.model.store('operator', value);

    console.table(this.model);
  };

  handleNumbers = (e) => {
    const { value } = e.target;
    if (!this.model.operator) {
      if (this.model.result) {
        this.model.clear('x', 'result');
      }
      this.model.store('x', value);
      this.model.store('displayValue', this.model.x);
    } else {
      this.model.store('y', value);
      this.model.store('displayValue', this.model.y);
    }

    this.onDisplayValueChanged();
    console.table(this.model);
  };

  handlePoint = (e) => {
    let { value } = e.target;
    const { x, y } = this.model;
    if (!this.model.operator) {
      if (x.includes(value)) {
        return;
      } else {
        this.model.store('x', value);
        this.model.store('displayValue', this.model.x);
      }
    } else {
      if (y.includes(value)) {
        return;
      } else {
        this.model.store('y', value);
        this.model.store('displayValue', this.model.y);
      }
    }

    this.onDisplayValueChanged();
    console.table(this.model);
  };

  onDisplayValueChanged() {
    this.view.updateDisplay(this.model.displayValue);
  }

  checkIsInt(value) {
    return Number.isInteger(parseInt(value));
  }

  makeFloat(value) {
    return parseFloat(value);
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

  store(key, value) {
    if (key === 'x' || key === 'y') {
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
}

const app = new Controller(new Model(), new View());
