module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community)/)',
  ],
  moduleNameMapper: {
    '\\.(ttf|otf|png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
