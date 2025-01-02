import { FormControl, FormGroup } from '@angular/forms';
import { ngxFormEvaluator } from './eval-expression.service';

describe('expressionEvaluator', () => {
  let formGroup: FormGroup;
  beforeEach(() => {
    formGroup = new FormGroup({
      f1: new FormControl(1),
      f11: new FormControl(1),
      f2: new FormControl(2),
      f3: new FormControl(3),
      f4: new FormControl(4),
      fa: new FormControl('a'),
      fb: new FormControl('b'),
      fc: new FormControl('c'),
    });
  });

  it('should return true', () => {
    const expressions = [
      ['f1', '=', 1],
      ['f1', '=', "1"],
      ['f2', '>', 1],
      ['f2', '>', "$f1"],
      ['f1', '<', "$f2"],
      ['f1', '<=', "$f1"],
      ['f1', '>=', "$f1"],
      ['f1', '=', "$f11"],
      [['f1', '=', 3], '|', ['f2', '=', 2] ],
      [['f3', '=', 3], '|', ['f2', '=', 1] ],
      [['fa', '=', "a"], '&', ['fb', '=', "b"]],
      [['fa', '=', "a"], '&', [['fb', '=', "c"], '|', ["fc", "=", "c"]]],
      ['f1', 'in', [1,3]],
      ['fa', 'nin', ["b", "c"]],
    ]
    for(const expression of expressions){
      expect(ngxFormEvaluator(formGroup, expression)).toBe(true);
    }
  });
  it('should return false', () => {
    const expressions = [
      ['f1', '=', 2],
      ['f1', '=', "2"],
      ['f2', '>', 3],
      ['f2', '>', "$f3"],
      ['f1', '<', 0],
      ['f1', '<=', 0],
      ['f1', '>=', 3],
      ['f1', '=', "$f2"],
      [['f1', '=', 3], '|', ['f2', '=', 4] ],
      [['f3', '=', 2], '|', ['f2', '=', 3] ],
      [['fa', '=', "b"], '&', ['fb', '=', "b"]],
      [['fa', '=', "c"], '&', [['fb', '=', "c"], '|', ["fc", "=", "c"]]],
      ['f1', 'in', [2,3]],
      ['fa', 'nin', ["a", "c"]],
    ]
    for(const expression of expressions){
      expect(ngxFormEvaluator(formGroup, expression)).toBe(false);
    }
  });




});
