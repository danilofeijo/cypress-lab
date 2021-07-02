# cypress-lab

A nice lab with settings and patterns to follow and apply in a real world. Also, there are older code about [Udemy course][1] which covers API, E2E and Interface test layers.

![Cypress Logo](https://www.pngkit.com/png/full/411-4116389_cypress-io-logo7639-cypress-io-logo.png)

## Setup
Download this repo, access the folder and run:

`$ npm install`

## Running Tests

### Run All tests
`$ npm run cy:run`
* Headless mode
* Default browser

### Run Spec
`$ npm run cy:run --spec cypress/integration/practical/api/backend.spec.js`
* Headless mode
* Default browser

### Run Folder
`$ npm run cy:run --spec cypress/integration/practical/api/**.*`
* Headless mode
* Default browser

### Run Not headless
`$ npm run cy:run --spec cypress/integration/practical/api/backend.spec.js --headed --no-exit`
* Better use to run specific spec
* "--headed" open the browser
* "--no-exit" keep the browser opened

### Run Specific browser
`$ npm run cy:run --spec cypress/integration/practical/api/backend.spec.js --browser chrome`
* Not headless
* Close the browser after execution

<!-- Links list -->
[1]: https://www.udemy.com/course/testes-cypress/
