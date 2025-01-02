import { ExpressionType } from './evaluator.model';
import { EvaluatorBase } from './evaluator.base';

export class EvaluatorEquality extends EvaluatorBase {
  operators = ['=',  '!='];

  evaluate(expression: ExpressionType): boolean {
    this.checkExpression(expression);
    const [firstValue, operator, secondValue] = expression;
    switch (operator) {
      case '=':
        return firstValue === secondValue;
      case '!=':
        return firstValue !== secondValue;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }

  canEvaluateExpression(expression: ExpressionType): boolean {
    this.checkExpression(expression);
    return this.operators.includes(<string>expression[1]) ;
  }

}
