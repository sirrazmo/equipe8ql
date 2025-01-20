module.exports = {
  testEnvironment: 'jsdom', // Simule un DOM pour les tests
  moduleNameMapper: {
    '^firebase$': '/__mocks__/firebase.js',
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', // Transforme les fichiers Vue
    '^.+\\.js$': 'babel-jest', // Transforme les fichiers JavaScript avec Babel
  },
  moduleFileExtensions: ['js', 'json', 'vue'], // Extensions reconnues
  transformIgnorePatterns: [
  "/node_modules/(?!@vue/)"
],
testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
};
