# CollinsonX Web Frontend

# Introduction

This README provides an overview of the deployment strategy for the project using Vercel, Github Actions, and Playwright. The aim is to streamline the deployment process, improve testing efficiency, and enhance the overall release management workflow.

# Introduction

This README provides an overview of the deployment strategy for the project using Vercel, Github Actions, and Playwright. The aim is to streamline the deployment process, improve testing efficiency, and enhance the overall release management workflow.

## Deployment Workflow

### Environments

- **Test Environment:** Automatic deployment to the test environment on each pull request merge to main.
- **UAT Environment:** Deployment triggered automatically after successful end-to-end tests in the deployed test environment above.
- **Production Environment:** Manual deployment using 'Promote to Production' on the Vercel website.

### Deployment Process

1. Developer raises a pull request against the main branch.
2. Automated deployment to the test environment using Vercel CLI and Github Actions.
3. End-to-end tests executed against the new deployment.
4. If tests pass, automatically trigger deployment to the UAT environment using Vercel CLI and Github Actions.
5. Post-UAT approval from the team/product lead, use Vercel UI to promote the deployment to Production.

### Frequently Asked Questions

#### Q: How do I deploy my changes to the test environment?

A: Developers should raise a pull request against the main branch. Once merged, the changes will be automatically deployed to the test environment using the build-deploy workflow.

#### Q: How do I trigger a deployment to the UAT environment?

A: After successful automated testing in the test environment, the build-deploy workflow will deploy automatically to the UAT environment.

#### Q: What happens if end-to-end tests fail in the test environment?

A: If tests fail, investigate and fix issues. Once fixed, raise a new pull request and merge to the main branch to repeat the deployment process.

#### Q: How can I deploy changes to production?

A: After UAT approval, navigate to the Vercel UI. Find the UAT deployment for your project, and use the Vercel UI to promote the deployment to Production.

#### Q: How can I rollback a deployment?

A: Rollback is handled by reverting the commit that caused the issue. Developers should create a new pull request that reverts the problematic commit and merge it into the main branch. Then promote the deployment to Production using the Vercel UI.

#### Q: How can I rollback deployment to production immediately when there is a critical production bug and then fix the issues later?

A: Go to the Vercel UI, navigate to your project, find 'Production' releases by selecting the Production environment from the dropdown. Select the previous deployment and choose 'Instant Rollback'.

#### Q: What's the process for hotfixes?

A: For critical issues in production, create a new branch from main, make necessary changes, test locally, and merge it into the main branch to trigger immediate deployment to both test and UAT environments. Then promote the UAT deployment to Production using the Vercel UI.

### Additional Notes

All deployment workflows are defined in the project's workflow files inside `.github/workflows`.

## Local Development Commands

### Install dependencies

```
pnpm install
```

### Clean dependencies

```
pnpm run clean
```

### Run local development environment

```
pnpm run dev
```

### Build production bundles

```
pnpm run build
```

### Add or remove dependencies to apps or packages

Dependencies inside apps or packages are handled using PNPM in order to avoid conflicts between packages.

Example of adding dependencies to an app:

```
pnpm i @mantine/core --filter main
```

Example of adding dependencies to a package:

```
pnpm i @mantine/core --filter @collinsonx/design-system
```

### Typescript errors

If you are getting typescript definition errors in VSCode (ie cannot find references/no exported member) when trying to access design system packages then:
Ctrl-P
Type `> Typescript: Restart TS Server`

This should resolve the issue.

## Setup CORS access for partner-management

Detailed information for local development setup for partner-management app can be found in [this page](https://github.com/CollinsonX/collinsonx-web/blob/dev/apps/partner-management/README.md#setup-cors-access).
