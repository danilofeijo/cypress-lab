# cypressLab2

## Setup
To do

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
