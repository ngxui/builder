export const operators = ['=','<' , '>' , '>=' , '<=' , 'in' , 'nin'];
export type Operator = typeof operators[number];
export type ExpressionType = (string|number|boolean|any[])[];



export const isOperator = (value: string): value is Operator => {
  return (operators as readonly string[]).includes(value);
}

