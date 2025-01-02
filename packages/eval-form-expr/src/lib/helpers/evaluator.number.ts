import { ExpressionType } from './evaluator.model';
import { EvaluatorBase } from './evaluator.base';

export class EvaluatorNumber extends EvaluatorBase {
  operators = ['=', '<', '>', '<=', '>=', '!=', '='];

  evaluate(expression: ExpressionType): boolean {
    this.checkExpression(expression);
    // eslint-disable-next-line prefer-const
    let [firstValue, operator, secondValue] = expression;
    if (!this.isNumber(firstValue) || !this.isNumber(secondValue)) {
      throw new Error('Invalid expression format: [in] value must be a number');
    }
    firstValue = Number(firstValue || 0);
    secondValue = Number(secondValue || 0);
    switch (operator) {
      case '=':
        return firstValue === secondValue;
      case '>':
        return firstValue > secondValue;
      case '<':
        return firstValue < secondValue;
      case '>=':
        return firstValue >= secondValue;
      case '<=':
        return firstValue <= secondValue;
      case '!=':
        return firstValue !== secondValue;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  canEvaluateExpression(expression: ExpressionType): boolean {
    this.checkExpression(expression);
    const [firstValue, operator, secondValue] = expression;
    return (
      this.operators.includes(<string>operator) &&
      this.isNumber(firstValue) &&
      this.isNumber(secondValue)
    );
  }

  isNumber(value: unknown): boolean {
    value = value || 0;
    if (typeof value === 'number') {
      return true;
    }
    if (typeof value === 'string') {
      return !isNaN(parseFloat(value)) && isFinite(+value);
    }
    return false;
  }
}
