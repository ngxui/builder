import { ExpressionType, isOperator } from './evaluator.model';

export abstract class EvaluatorBase {
  abstract evaluate(expression: ExpressionType): boolean;
  abstract canEvaluateExpression(expression: ExpressionType): boolean;
  /**
   *  expression format mut be [value1, operator, value2]
   *
   * @param expression
   */
  checkExpression(expression: any[]): boolean{
    if(expression.length !== 3){
      throw Error(`Invalid expression: ${expression}`);
    }
    if(!isOperator(expression[1])){
      throw Error(`Invalid operator: ${expression[1]}`);
    }
    return true;
  }



}
