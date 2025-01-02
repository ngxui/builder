export default {
  displayName: 'eval-form-expr',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|mjs|js)$': ['jest-preset-angular', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/expression-evaluator',
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
