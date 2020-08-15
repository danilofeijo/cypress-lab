# cypressLab2

Code about the course [Testes de aplicações modernas com Cypress][1]. It covers API, E2E and Interface tests.

![Cypress Logo](https://www.pngkit.com/png/full/411-4116389_cypress-io-logo7639-cypress-io-logo.png)
![Udemy Logo](https://www.udemy.com/staticx/udemy/images/v6/logo-coral.svg)


## Setup
Download this repo, access the folder and run:

`$ yarn install`

## Running Tests

### Run All tests
`$ yarn run cy:run`
* Headless mode
* Default browser

### Run Spec
`$ yarn run cy:run --spec cypress/integration/practical/api/backend.spec.js`
* Headless mode
* Default browser

### Run Folder
`$ yarn run cy:run --spec cypress/integration/practical/api/**.*`
* Headless mode
* Default browser

### Run Not headless
`$ yarn run cy:run --spec cypress/integration/practical/api/backend.spec.js --headed --no-exit`
* Better use to run specific spec
* "--headed" open the browser
* "--no-exit" keep the browser opened

### Run Specific browser
`$ yarn run cy:run --spec cypress/integration/practical/api/backend.spec.js --browser chrome`
* Not headless
* Close the browser after execution

<!-- Links list -->
[1]: https://www.udemy.com/course/testes-cypress/
