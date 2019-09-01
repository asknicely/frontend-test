module.exports = {
  // preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  verbose: true,
  moduleDirectories: ['node_modules', 'src'],
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  moduleFileExtensions: ['js', 'vue', 'ts', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!(bootstrap-vue)/)'],
  testPathIgnorePatterns: [
    '/build/',
    '/config/',
    '/data/',
    '/dist/',
    '/node_modules/',
    '/test/',
    '/vendor/'
  ]
}