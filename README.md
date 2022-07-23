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
This POC makes use of the Pageobject model of web application testing. The idea behind this is that we represent every page of the application under test as an independent object. This way, even a complex web application can be broken down into multiple simpler objects to reduce the complexity of automation. The pageobject pattern also drastically improves the maintainability of code.

A page object will have references to the UI elements in the page represented as properties of the object. All references to a DOM element of the page can be maintained in a single place this way and any redesign of the page will only need the respective locator for that property to be changed. Otherwise we would have to look through the entire test code to see any references to the elements in the page, which can be both tedious and error prone.

The page object will also have the actions that can be done in the page written as methods/functions. This ensures that common operations on the page can be made available as reusable functions. Much like page elements, this makes maintenance easier and also improves stability of the tests by making sure the same repeatable procedure is performed each time for the specific operation on the page.

Page objects for this POC are located in cypress/pages with file extensions ending in *Page.js.

The web UI elements are written as getter functions that return elements on which cypress actions can be directly performed. This is a little different from using string locators as seen in some other designs. Using locators as strings would require a cy/browser object to perform a get on the string to get an instance of the browser object on which further actions can be performed as below:
``` 
// locator string for myElement
let myElement = 'button#submit';

// Click on myElement
cy.get(myElement).click();
```
Creating them as getters instead makes the code more readable as below:
``` 
// getter function for myElement
get myElement () { return cy.get('button#submit') };

// Click on myElement
myElement.click();
```


## Reusable Functions
Common functions that can be shared across multiple tests are stored in cypress/support in a file named commands.js. 

As an example I have included login. This can be utilized as 
```cy.login(username, password)```
