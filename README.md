<img 
  src="https://www.pngkit.com/png/full/411-4116389_cypress-io-logo7639-cypress-io-logo.png"
  alt="Cypress Logo"
  width="300"
  class="center"
/>

# cypress-lab

A test automation setup with patterns and settings that can be apply in a real world.

## Setup
Download this repo, access the folder and run:

`$ npm install`

<!-- TODO Adjust running commands -->
## Running Tests

### By environment
`npx cypress run --env configFile=<env>`

### Run All tests
`$ npm run cy:run`
* Headless mode
* Default browser

### Run Spec
`$ npm run cy:run --spec cypress/integration/udemy-course/practical/api/backend.spec.js`
* Headless mode
* Default browser

### Run Folder
`$ npm run cy:run --spec cypress/integration/udemy-course/practical/api/**.*`
* Headless mode
* Default browser

### Run Not headless
`$ npm run cy:run --spec cypress/integration/udemy-course/practical/api/backend.spec.js --headed --no-exit`
* Better use to run specific spec
* "--headed" open the browser
* "--no-exit" keep the browser opened

### Run Specific browser
`$ npm run cy:run --spec cypress/integration/udemy-course/practical/api/backend.spec.js --browser chrome`
* Not headless
* Close the browser after execution

<!-- Links list -->
