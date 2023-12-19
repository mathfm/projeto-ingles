const calculator = {
  display: document.getElementById("valor-calculadora"),
  buttons: document.querySelectorAll("#btn-container button"),
  currentNumber: "",
  firstOperand: null,
  operator: null,
  restart: false,

  updateResult(originClear = false) {
    this.display.innerText = originClear ? 0 : this.currentNumber;
  },

  addDigit(digit) {
    if (digit === "." && (this.currentNumber.includes(".") || !this.currentNumber)) return;

    if (this.restart) {
      this.currentNumber = digit;
      this.restart = false;
    } else {
      this.currentNumber += digit;
    }

    this.updateResult();
  },

  setOperator(newOperator) {
    if (this.currentNumber) {
      this.calculate();
      this.firstOperand = parseFloat(this.currentNumber);
      this.currentNumber = "";
    }

    this.operator = newOperator;
  },

  calculate() {
    if (this.operator === null) return;

    const secondOperand = parseFloat(this.currentNumber);

    // Verifica se o primeiro operando está definido
    if (this.firstOperand === null && !isNaN(secondOperand)) {
      this.firstOperand = secondOperand;
    } else if (isNaN(secondOperand)) {
      // Retorna ou trata conforme necessário se o segundo operando não for válido
      return;
    }

    let resultValue;

    switch (this.operator) {
      case "+":
        resultValue = this.firstOperand + secondOperand;
        break;
      case "-":
        resultValue = this.firstOperand - secondOperand;
        break;
      case "*":
        resultValue = this.firstOperand * secondOperand;
        break;
      case "/":
        resultValue = this.firstOperand / secondOperand;
        break;
      default:
        return;
    }

    this.currentNumber = resultValue % 1 !== 0 ? resultValue.toFixed(5) : resultValue.toString();
    this.operator = null;
    this.firstOperand = null;
    this.restart = true;
    this.updateResult();
  },

  clearCalculator() {
    this.currentNumber = "";
    this.firstOperand = null;
    this.operator = null;
    this.updateResult(true);
  },

  deleteNumber() {
    this.currentNumber = this.currentNumber.slice(0, -1);
    this.updateResult();
    if (this.currentNumber.length === 0) {
      this.updateResult(true);
    }
  },

  setPercentage() {
    let result = parseFloat(this.currentNumber) / 100;

    if (["+", "-"].includes(this.operator)) {
      result *= this.firstOperand || 1;
    }

    this.currentNumber = result % 1 !== 0 ? result.toFixed(5) : result.toString();
    this.updateResult();
  },

  init() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const buttonText = button.innerText;

        if (/^[0-9.]+$/.test(buttonText)) {
          this.addDigit(buttonText);
        } else if (["+", "-", "*", "/"].includes(buttonText)) {
          this.setOperator(buttonText);
        } else if (buttonText === "=") {
          this.calculate();
        } else if (buttonText === "C") {
          this.clearCalculator();
        } else if (buttonText === "%") {
          this.setPercentage();
        } else if (buttonText === "DEL") {
          this.deleteNumber();
        }
      });
    });
  },
};

calculator.init();
