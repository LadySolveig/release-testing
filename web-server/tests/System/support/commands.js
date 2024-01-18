/**
 * Imports commands fom files. The commands start with the folder name and an underscore as cypress doesn't support
 * namespaces for commands.
 *
 * https://github.com/cypress-io/cypress/issues/6575
 */

import './commands/api';
import './commands/config';
import './commands/db';

const { registerCommands } = require('../../../node_modules/joomla-cypress/src/index.js');

registerCommands();

Cypress.Commands.overwrite('doFrontendLogin', (originalFn, username, password, useSnapshot = true) => {
  // Ensure there are valid credentials
  const user = username ?? Cypress.env('username');
  const pw = password ?? Cypress.env('password');

  // Do normal login when no snapshot should be used
  if (!useSnapshot) {
    // Clear the session data
    Cypress.session.clearAllSavedSessions();

    // Call the normal function
    return originalFn(user, pw);
  }

  // Do login through the session
  return cy.session([user, pw, 'front'], () => originalFn(user, pw), { cacheAcrossSpecs: true });
});

Cypress.Commands.overwrite('doFrontendLogout', (originalFn) => {
  // Call the login function
  originalFn();

  // Clear the session data
  Cypress.session.clearAllSavedSessions();
});

Cypress.Commands.overwrite('doAdministratorLogin', (originalFn, username, password, useSnapshot = true) => {
  // Ensure there are valid credentials
  const user = username ?? Cypress.env('username');
  const pw = password ?? Cypress.env('password');

  // Do normal login when no snapshot should be used
  if (!useSnapshot) {
    // Clear the session data
    Cypress.session.clearAllSavedSessions();

    // Call the normal function
    return originalFn(user, pw);
  }

  // Do login through the session
  return cy.session([user, pw, 'back'], () => originalFn(user, pw), { cacheAcrossSpecs: true });
});

Cypress.Commands.overwrite('doAdministratorLogout', (originalFn) => {
  // Call the login function
  originalFn();

  // Clear the session data
  Cypress.session.clearAllSavedSessions();
});

Cypress.Commands.add('createArticle', (article) => {
  cy.visit('/administrator/index.php?option=com_content&task=article.add');

  cy.get('#jform_title').clear().type(article);
  cy.clickToolbarButton('Save & Close');

  cy.get('#system-message-container').contains('Article saved.').should('exist');
  cy.contains(article);
})

