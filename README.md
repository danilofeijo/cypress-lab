![Icon laboratory][lab-icon]

# cypress-lab

A test automation setup with patterns and settings that can be apply in a real world.

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

<!-- Links list -->
[lab-icon]: https://image.flaticon.com/icons/png/128/1157/1157001.png
[1]: https://docs.cypress.io/guides/guides/command-line#Commands
