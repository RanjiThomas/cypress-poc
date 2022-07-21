# Cypress POC
This is a proof of concept project to demonstrate the use of [Cypress](https://www.cypress.io/) for end to end validation of a web application.

## Test Specs
Test Specs are located in cypress/e2e with file extensions ending in *.cy.js. 

Cypress uses [Mocha](https://mochajs.org/) format for test specification. The main parts of a test in the Mocha framework are described below to get you started with writing tests. For more detailed functionality, read through the Mocha webpage linked above.

You can specify a *feature* using a **describe** keyword. 

Within the feature you can write the *specifications* of that feature demarcated by **it** blocks. Each it block is treated as distinct test for the run.

The feature may also have the following setup blocks:
- **before** - a block that is run once at the start of the describe block</li>
- **beforeEach** - a block that is run before the start of each it block</li>
- **after** - a block that is run once at the end of the describe block</li>
- **afterEach** - a block that is run after the end of each it block</li>

You may also nest describe blocks to sub-group features within a larger feature.

## Page Objects
Page objects are located in cypress/pages with file extensions ending in *.js

## Reusable Functions
Common functions that can be shared across multiple tests are stored in cypress/support in a file named commands.js. 

As an example I have included login. This can be utilized as 
```cy.login(username, password)```
