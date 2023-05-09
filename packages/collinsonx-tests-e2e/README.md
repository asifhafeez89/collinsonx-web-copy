# End-to-end Testing
## Playwright Screenplay Model
Playwright is a Node.js library for automating web browsers. It provides a high-level API for controlling Chrome, Firefox, and Safari through a single API.

Screenplay is a design pattern for organizing test automation code that separates the concerns of the test code into distinct components: actions, questions, and pages.

### Actions
An action is a reusable piece of code that represents a user action on a web page. Actions can be anything from clicking a button to filling out a form to navigating to a different page. Actions encapsulate the logic necessary to perform the action and can be reused across multiple tests.

### Questions
A question is a reusable piece of code that represents a query about the state of a web page. Questions can be used to retrieve information from a web page, such as the text of a heading or the value of a form field. Questions encapsulate the logic necessary to retrieve the information and can be reused across multiple tests.

### Pages
A page represents a specific web page or a portion of a web page. Pages encapsulate the logic necessary to interact with the web page and provide a clear separation of concerns between the test code and the underlying web page. Pages can contain both actions and questions.

### Specs
A spec is a test script that uses the actions and questions to perform a specific test. Specs are organized into suites that group related tests together.

## Login
Login uses a service called mailinator to work with the passwordless workflow. Once an email with a OTP is send we use the mailinator SDK to get the emails and find the OTP that we use to login

## Running tests locally
1. pnpm i
2. cd packages/collinsonx-tests-e2e
3. pnpm run dev
4. pnpm run e2e:dev

## Pipeline
The pipeline is run on Pull Request and will run the e2e_tests.yaml github actions pipeline.
To run the test they perform:
1. npm install -g pnpm
2. pnpm i
3. cd packages/collinsonx-tests-e2e
4. pnpm run e2e:start
