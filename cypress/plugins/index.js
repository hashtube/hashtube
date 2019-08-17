const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')

module.exports = (on) => {
  // Cypress does not have built-in support for typescript https://github.com/cypress-io/cypress/issues/1859
  // webpack can be removed when nuxtjs is added
  on('file:preprocessor', cypressTypeScriptPreprocessor)
}
