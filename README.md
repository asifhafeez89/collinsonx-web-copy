# CollinsonX Web Frontend

## Microfrontend (POC)

Apps folder currently contains two microfrontends as a proof-of-concept.

- `apps/main` will run locally on localhost:3000
- `apps/search` (POC module) will run locally on localhost:3001/search

Project is structured with vertical-type microfrontends leveraging Next.js Multi-zones for Vercel deployment.

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
