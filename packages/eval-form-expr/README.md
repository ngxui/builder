# @ngxui/eval-form-expr


# Angular Expression Evaluator

The Angular Expression Evaluator package allows you to evaluate complex logical and comparison expressions against an Angular FormGroup. It supports a variety of operators, nested expressions, and references to other form control values.

## Features

- Evaluate expressions with common comparison operators (`=`, `>`, `<`, `<=`, `>=`, `in`, `nin`).
- Support for logical operators (`&` for AND, `|` for OR).
- Nested expressions for complex logic.
- Dynamic references to other form controls using `$` notation.


### Quick Links

🚀 See it in action on [Stackblitz](https://stackblitz.com/edit/ngxui-eval-expression)


## Installation

Install the package via npm:

```bash
npm install @ngxui/eval-form-expr
```

## Usage

### Import the Module

Import the evaluator into your Angular component or service:

```typescript
import { ngxFormEvaluator } from '@ngxui/eval-form-expr';
```

### Example FormGroup Setup

```typescript
import { FormBuilder, FormGroup } from '@angular/forms';

const formGroup: FormGroup = new FormBuilder().group({
  f1: [1],
  f2: [2],
  f3: [3],
  fa: ['a'],
  fb: ['b'],
  fc: ['c']
});
```

### Evaluate Expressions

Use the `ngxFormEvaluator` to evaluate expressions:

```typescript

const expression = [
  ['f1', '=', 1],
  ['f2', '>', '$f1'],
  [['fa', '=', 'a'], '&', [['fb', '=', 'c'], '|', ['fc', '=', 'c']]]
];

const result = ngxFormEvaluator(formGroup, expression);
console.log(result); // Output: true or false depending on the formGroup values
```

## Supported Expression Formats

### Simple Expressions

| Format                      | Description                                                  |
|-----------------------------|--------------------------------------------------------------|
| `['f1', '=', 1]`            | Check if the value of `f1` equals `1`.                       |
| `['f2', '>', 1]`            | Check if the value of `f2` is greater than `1`.              |
| `['f1', '<', '$f2']`        | Check if the value of `f1` is less than the value of `f2`.   |
| `['fa', 'in', ["a", "b"]]`  | Check if the value of `fa` is in the array `["a", "b"]`.     |
| `['fa', 'nin', ["c", "d"]]` | Check if the value of `fa` is not in the array `["c", "d"]`. |

### Logical Operators

| Operator | Symbol | Description                  |
|----------|--------|------------------------------|
| AND      | `&`    | All conditions must be true. |
| OR       | `      | `                            | At least one condition must be true. |

#### Example:

```typescript
const expression = [['f1', '=', 1], '|', ['f2', '>', 2]];
```
This checks if `f1 = 1` OR `f2 > 2`.

### Nested Expressions

Expressions can be nested to create complex logical conditions:

```typescript
const expression = [
  ['fa', '=', 'a'],
  '&',
  [
    ['fb', '=', 'b'],
    '|',
    ['fc', '=', 'c']
  ]
];
```
This checks if `fa = 'a'` AND (`fb = 'b'` OR `fc = 'c'`).

## Referencing Other Form Controls

You can reference the value of another form control using `$` notation:

```typescript
['f2', '>', '$f1']
```
This checks if the value of `f2` is greater than the value of `f1`.

## API

### `ngxFormEvaluator(formGroup: FormGroup, expression: NestedArray): boolean`

Evaluates a given expression against the provided Angular FormGroup.

#### Parameters:
- `formGroup: FormGroup`: The Angular FormGroup containing the form controls.
- `expression: NestedArray`: The expression to evaluate, which can be a simple or nested array of conditions.

#### Returns:
- `boolean`: The result of the evaluation.

## Error Handling

- If a field referenced in the expression does not exist in the FormGroup, it will be treated as `undefined`.
- Unsupported operators or invalid expressions will throw an error.

## Example Expressions

```typescript
const expressions = [
  ['f1', '=', 1],
  ['f1', '=', '1'],
  ['f2', '>', 1],
  ['f2', '>', '$f1'],
  ['f1', '<', '$f2'],
  ['f1', '<=', '$f1'],
  ['f1', '>=', '$f1'],
  [['f1', '=', 3], '|', ['f2', '=', 2]],
  [['fa', '=', 'a'], '&', ['fb', '=', 'b']],
  [['fa', '=', 'a'], '&', [['fb', '=', 'c'], '|', ['fc', '=', 'c']]],
  ['f1', 'in', [1, 3]],
  ['fa', 'nin', ['b', 'c']]
];
```


## Building

Run `nx build eval-form-expr` to build the library.

## Running unit tests

Run `nx test eval-form-expr` to execute the unit tests via [Jest](https://jestjs.io).


## Contributing

Feel free to open issues or submit pull requests for improvements and bug fixes.

## License

This package is licensed under the MIT License. See the LICENSE file for more details.






