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