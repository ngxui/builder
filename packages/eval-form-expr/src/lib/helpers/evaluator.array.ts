import { ExpressionType } from './evaluator.model';
import { EvaluatorBase } from './evaluator.base';

export class EvaluatorArray extends EvaluatorBase {
  operators = ['in',  'nin'];

  evaluate(expression: ExpressionType): boolean {
    this.checkExpression(expression);
    const [firstValue, operator, secondValue] = expression;
    switch (operator) {
      case 'in':
        return  Array.isArray(secondValue) ? secondValue.includes(firstValue):false;
      case 'nin':
        return Array.isArray(secondValue) ? !secondValue.includes(firstValue):false;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  canEvaluateExpression(expression: ExpressionType): boolean {
    this.checkExpression(expression);
    return this.operators.includes(<string>expression[1]) && Array.isArray(expression[2]);
  }

}
