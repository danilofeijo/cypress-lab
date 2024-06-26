[![E2E tests](https://github.com/danilofeijo/cypress-lab/actions/workflows/node.js.yml/badge.svg)](https://github.com/danilofeijo/cypress-lab/actions/workflows/node.js.yml)
[![Badge ServeRest](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/ServeRest/ServeRest/)
![GitHub](https://img.shields.io/github/license/danilofeijo/cypress-lab)

# cypress-lab
![Icon laboratori][cy-logo] ![Icon laboratory][flask-icon]

A E2E test automation setup that you can apply in the real world.

## Features
### Test suite
* ✅ [ServeRest][tool-serverest], an amazing server that simulates an e-commerce to be tested
* ✅ [Cypress][tool-cy], to create and run E2E tests
* ✅ [Faker][tool-faker], to generate randon data for tests
* ✅ "Page Action" custom pattern, to organize test structure
* ✅ [Environment config][tool-envConfig], to run tests in multiple environment
* ✅ [Test retry ][tool-retry], to repeat failed tests and avoid flakiness

### Code quality
* ✅ [Prettier][tool-prettier] - to format the code
* ✅ [ESLint][tool-eslint], to identify wrong patterns in the code
* ✅ [Husky][tool-husky], to check enhance commits
* ✅ [commitlint][tool-commitlint], to mantain better commit messages based on [Conventional Commits][tool-convCommits]

### CI/CD
* ✅ [GitHub Actions][tool-ghactions], to automatically trigger test execution in CI/CD
* ✅ [mochawesome][tool-mochawesome], to provide feedback about test execution
* ❌ [Testing Parallelization][tool-parallelization], to accelerate test execution

## Setup

1. Clone and access the cloned repo folder

    `$ git clone https://github.com/danilofeijo/cypress-lab.git && cd cypress-lab`

2. Install the project dependencies

    `$ npm install`

## CLI commands
### Tests Execution

Run `npx cypress open`, to open the Cypress Test Runner.

Check more available commands by visiting `scripts` session on `package.json` file.

### Relevant parameters

* from Cypress
  * `--browser chrome`, to set browser (default is Electron)
  * `--headless`, to headless execution (default for Electron)
  * `--headed`, to non headless execution (default for Chrome/Firefox)
  * `--env configFile=<env>`, to set an environment (default is 'qa')
  * `--spec '<file-path>/test-file.cy.js'`, to run specific test file

Check other nice parameters by visiting the [Command Line Cypress page][ref-1].

## References

* [Cypress Docs][ref-4]
* [Utilizando Cypress na vida real][ref-2]
* [Keep passwords secret in E2E tests][ref-3]
* [ServeRest][ref-6]
* [Publish your Cypress Test Report with GitHub Actions][ref-5]
* [Conventional Commits][ref-7]
* [ESLint + Prettier, a dupla perfeita para produtividade e padronização de código.][ref-8]
* [Choose an open source license][ref-9]
* [Como escolher uma licença para seu projeto][ref-10]

<!-- Links list -->
[flask-icon]: img/icon-lab-128.png "Flask icon"
[cy-logo]: img/cy-logo.png "Cypress logo"

[ref-1]: https://docs.cypress.io/guides/guides/command-line#Commands
[ref-2]: https://medium.com/testbean/utilizando-cypress-na-vida-real-a93eec549128
[ref-3]: https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
[ref-4]: https://docs.cypress.io/guides/
[ref-5]: https://medium.com/swlh/publish-your-cypress-test-report-with-github-actions-47248788713a
[ref-6]: https://serverest.dev/
[ref-7]: https://www.conventionalcommits.org/en/v1.0.0/#summary
[ref-8]: https://medium.com/cwi-software/eslint-prettier-a-dupla-perfeita-para-produtividade-e-padroniza%C3%A7%C3%A3o-de-c%C3%B3digo-6a7730cfa358
[ref-9]: https://choosealicense.com/
[ref-10]: https://www.alura.com.br/artigos/como-escolher-uma-licenca-para-seu-projeto

[tool-cy]: https://www.cypress.io/how-it-works
[tool-faker]: https://www.npmjs.com/package/faker
[tool-prettier]: https://www.npmjs.com/package/prettier
[tool-eslint]: https://www.npmjs.com/package/eslint
[tool-husky]: https://typicode.github.io/husky/
[tool-convCommits]: https://www.conventionalcommits.org/
[tool-ghactions]: https://docs.github.com/en/actions
[tool-commitlint]: https://commitlint.js.org/#/
[tool-mochawesome]: https://www.npmjs.com/package/mochawesome
[tool-serverest]: https://serverest.dev/
[tool-envConfig]: https://glebbahmutov.com/blog/load-cypress-env-settings/
[tool-retry]: https://docs.cypress.io/guides/guides/test-retries#Configure-Test-Retries
[tool-parallelization]: https://docs.cypress.io/guides/cloud/smart-orchestration/parallelization
