import { FormGroup } from '@angular/forms';
import { evaluatorContext } from './helpers/evaluator.context';
import { NestedArray } from '@ngxui/common';
import { ExpressionType } from './helpers/evaluator.model';

class EvalExpressionService {
  private evaluatorContext = evaluatorContext;

  isSimpleEvaluation(expression: NestedArray): boolean {
    return (
      Array.isArray(expression) &&
      expression.length === 3 &&
      typeof expression[0] === 'string'
    );
  }

  /**
   * Evaluates a single expression based on the provided expression components.
   *
   * This method processes an expression in the form of an array where:
   *  - `fieldsName`: The name of the field in the form group whose value will be evaluated.
   *  - `operator`: The operator used to evaluate the expression (e.g., '=', '<', etc.).
   *  - `secondParam`: The second parameter in the expression, which can either be a reference field name or a direct value.
   *
   * The method retrieves the value of the form field identified by `fieldsName` from the provided `formGroup`.
   * It then processes `secondParam`. If `secondParam` is a string starting with `$`, it looks up the value of the field with the name
   * specified in `secondParam` (ignoring the `$` symbol), otherwise it uses `secondParam` directly.
   *
   * After resolving the values for the expression, the method passes them to the evaluator context to evaluate the entire expression.
   *
   * @param expression - An array representing the expression to evaluate:
   *   - `expression[0]` (`fieldsName`): The field name from the form group to evaluate.
   *   - `expression[1]` (`operator`): The operator for the expression (e.g., '=', '>', etc.).
   *   - `expression[2]` (`secondParam`): The second operand in the expression, which could be a field name or a direct value.
   *
   * @param formGroup - The Angular form group containing the form controls.
   *
   * @returns The result of evaluating the expression. The result is based on the value of the form fields and the operator.
   *
   * @example
   * const result = this.evaluateSingleExpression(
   *   ['amount', '=', '$total'],
   *   formGroup
   * );
   *
   * In the example, it checks if the value of the `amount` field is equal to the value of the `total` field from the form group.
   */
  private evaluateSingleExpression(
    expression: ExpressionType,
    formGroup: FormGroup
  ) {
    const [fieldsName, operator, secondParam] = expression;
    const fieldValue =
      typeof secondParam === 'string' && secondParam?.startsWith('$')
        ? formGroup.get(<string>secondParam.slice(1))?.value
        : secondParam;
    return this.evaluatorContext.evaluate([
      formGroup.get(<string>fieldsName)?.value,
      operator,
      fieldValue,
    ]);
  }

  /**
   * Evaluates a given expression based on the provided form group and expression type.
   *
   * This method supports both simple and nested expressions. If the expression is simple, it delegates
   * the evaluation to the `evaluateSingleExpression` method. For nested expressions, it recursively evaluates
   * each nested expression and combines the results based on the logical operators (`&` for AND, `|` for OR).
   *
   * The method handles the following:
   * - **Simple Evaluation**: If the expression is simple (e.g., a single field comparison), it uses `evaluateSingleExpression` to compute the result.
   * - **Nested Evaluation**: If the expression contains nested arrays, the method evaluates each nested expression recursively. The results are then combined using the logical operators:
   *   - `&` (AND): The result is `true` if both the previous result and the nested result are `true`.
   *   - `|` (OR): The result is `true` if at least one of the previous result or nested result is `true`.
   *
   * @param formGroup - The Angular form group containing the form controls to evaluate.
   * @param expression - A nested array representing the expression to evaluate. It can be a simple expression or a more complex, nested array of expressions.
   *
   * @returns A boolean indicating the result of evaluating the expression. The result will be `true` or `false`, depending on the evaluation of the expression and the logical operators involved.
   *
   * @example
   * const result = this.evaluate(formGroup, [['amount', '=', 100], '&', ['status', '=', 'active']]);
   *
   * In this example, the method evaluates whether `amount` equals 100 AND `status` equals 'active'.
   */
  evaluate(formGroup: FormGroup, expression: NestedArray): boolean {
    if (this.isSimpleEvaluation(expression)) {
      return this.evaluateSingleExpression(expression, formGroup);
    }
    let result = null;
    for (let expIndex = 0; expIndex < expression.length; expIndex++) {
      if (Array.isArray(expression[expIndex])) {
        const nestedResult = this.evaluate(
          formGroup,
          <NestedArray>expression[expIndex]
        );
        if (result === null) {
          result = nestedResult;
        }
        if (expression[expIndex - 1] === '&') {
          result = result && nestedResult;
        } else if (expression[expIndex - 1] === '|') {
          result = result || nestedResult;
        }
      }
    }
    return !!result;
  }
}

const evaluatorService = new EvalExpressionService();
export const ngxFormEvaluator = (
  formGroup: FormGroup,
  expression: NestedArray
) => evaluatorService.evaluate(formGroup, expression);
