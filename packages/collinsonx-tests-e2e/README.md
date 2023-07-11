# End-to-end Testing
### Pages
A page represents a specific web page or a portion of a web page. Pages encapsulate the logic necessary to interact with the web page and provide a clear separation of concerns between the test code and the underlying web page.

### Specs
A spec is a test script that uses the pages and utils to perform a specific test. Specs are organized into suites that group related tests together.

## Login/Sign-up
Login/Sign-up uses a service called mailinator to work with the passwordless workflow. Once an email with a OTP is sent we use the mailinator SDK to get the emails and find the OTP that we use to login. On partner sign-up an email is sent to mailinator with a URL that leads to a sign-up form; this URL is extracted and used in playwright to interact with the form to sign-up and automatically login.

## Running tests locally (currently not implemented)
1. pnpm i (may need to run pnpm clean beforehand if receiving errors)
2. cd packages/collinsonx-tests-e2e
3. pnpm run dev
4. pnpm run e2e:dev

## Running tests for TEST/UAT environments
1. pnpm i (may need to run pnpm clean beforehand if receiving errors)
2. cd packages/collinsonx-tests-e2e
4. pnpm e2e:<ENVIRONMENT>

## Pipeline
The pipeline is run on Pull Request and will run the e2e_tests.yaml github actions pipeline.
To run the test they perform:
1. npm install -g pnpm
2. pnpm i
3. cd packages/collinsonx-tests-e2e
4. pnpm run e2e:start
