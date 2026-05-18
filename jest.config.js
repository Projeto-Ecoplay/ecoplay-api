module.exports = {
  testEnvironment: 'node',

  testMatch: [
    '**/tests/**/*.test.js'
  ],

  collectCoverageFrom: [
    'src/controllers/**/*.js',
    'src/services/**/*.js',
    'src/middlewares/**/*.js'
  ],

  coverageDirectory: 'coverage'
};

