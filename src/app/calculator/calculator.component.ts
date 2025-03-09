import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  currentNumber = '';
  firstOperand: number | null = null;
  operator: string | null = null;
  awaitingSecondOperand = false;

  appendNumber(number: string) {
    if (this.awaitingSecondOperand) {
      this.currentNumber = number;
      this.awaitingSecondOperand = false;
    } else {
      this.currentNumber += number;
    }
  }

  chooseOperator(op: string) {
    if (this.currentNumber === '') return;
    
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.currentNumber);
    } else if (this.operator) {
      this.compute();
    }
    
    this.operator = op;
    this.awaitingSecondOperand = true;
  }

  compute() {
    if (this.firstOperand === null || this.operator === null) return;
    
    let secondOperand = parseFloat(this.currentNumber);
    switch (this.operator) {
      case '+':
        this.currentNumber = (this.firstOperand + secondOperand).toString();
        break;
      case '-':
        this.currentNumber = (this.firstOperand - secondOperand).toString();
        break;
      case '*':
        this.currentNumber = (this.firstOperand * secondOperand).toString();
        break;
      case '/':
        this.currentNumber = secondOperand !== 0 ? (this.firstOperand / secondOperand).toString() : 'Error';
        break;
    }

    this.firstOperand = parseFloat(this.currentNumber);
    this.operator = null;
  }

  clear() {
    this.currentNumber = '';
    this.firstOperand = null;
    this.operator = null;
    this.awaitingSecondOperand = false;
  }
}
