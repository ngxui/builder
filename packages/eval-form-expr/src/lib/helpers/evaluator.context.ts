import { EvaluatorBase } from './evaluator.base';
import { ExpressionType } from './evaluator.model';
import { EvaluatorNumber } from './evaluator.number';
import { EvaluatorArray } from './evaluator.array';
import { EvaluatorEquality } from './evaluator.equality';

class EvaluatorContext {
  private evaluators: EvaluatorBase[];

  constructor(evaluators: EvaluatorBase[]) {
    this.evaluators = evaluators;
  }

  evaluate(expression: ExpressionType): boolean {
    // Find the first evaluator that can handle the value
    const evaluator = this.evaluators.find(evaluator => evaluator.canEvaluateExpression(expression));
    if (!evaluator) {
      throw new Error(`No evaluator found for the given expression ${expression}`);
    }
    return evaluator.evaluate(expression);
  }
}

const evaluators = [
  new EvaluatorNumber(),
  new EvaluatorArray(),
  new EvaluatorEquality(),
]
export const evaluatorContext = new EvaluatorContext(evaluators);
