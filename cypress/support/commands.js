// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const OKTA_URL = Cypress.env('oktaUrl');

// Cypress.Cookies.debug(true);
// Cypress.Cookies.defaults({
//     preserve: ['JSESSIONID', 'dmp_oauth_token','XSRF-TOKEN']
// });
Cypress.Commands.add('login', (username, password) => {
    cy.once('uncaught:exception', () => false);
    cy.session(username, () => {
        cy
            .intercept(`${OKTA_URL}/**`).as('sso')
            .visit('/')
            .get('#idp-discovery-username', { timeout: 10000 }).type(username)
            .get('#idp-discovery-submit', {timeout:100000}).click()
            .get('#okta-signin-password', {timeout:100000}).type(password)
            .get('#okta-signin-submit', {timeout:100000}).click()
        ;
        cy.wait(10000);
    })
});