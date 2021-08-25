[![E2E test suite execution](https://github.com/danilofeijo/cypress-lab/actions/workflows/node.js.yml/badge.svg)](https://github.com/danilofeijo/cypress-lab/actions/workflows/node.js.yml)
[![Badge ServeRest](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/ServeRest/ServeRest/)

# cypress-lab
![Icon laboratory][lab-icon]

A test automation setup with patterns and settings that can be applied in a real world.

## What do we have here
* Cypress - to create and run E2E tests
* Faker - to generate randon data
* "Page action" pattern - to organize the test structure
* GitHub Actions - to automattically trigger test execution
* [TODO] Allure report - to provide feedback about test execution
* [TODO] ESlint - to find and fix problems in the code
* [TODO] Husky - to check and improve commits

## Setup
Download this repo, access the folder and run:

`$ npm install`

## Tests Execution

To open the Cypress Test Runner:
* `npx cypress open --env configFile=<env>`

To run Cypress tests to completion:
* `npx cypress run --env configFile=<env>`

To run a specific test file
* `npx cypress run --env configFile=<env> --spec 'cypress/integration/test-file.spec.js'`

## Relevant parameters

Set browser (Electron is the default)
* `--browser chrome`

Headless execution (Default for Electron)
* `--headless`

Non headless execution (Default for Chrome/Firefox)
* `--headed`

Check other nice paramenters them by visiting the [Command Line Cypress page][1].

## References

* [Cypress Docs][4]
* [Utilizando Cypress na vida real][2]
* [Keep passwords secret in E2E tests][3]


<!-- Links list -->
[lab-icon]: https://image.flaticon.com/icons/png/128/1157/1157001.png
[1]: https://docs.cypress.io/guides/guides/command-line#Commands
[2]: https://medium.com/testbean/utilizando-cypress-na-vida-real-a93eec549128
[3]: https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
[4]: https://docs.cypress.io/guides/
