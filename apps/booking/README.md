# Prebook App

## Getting Started

1. The following alias should be placed inside /etc/hosts file:

```
127.0.0.1 booking-local.test.cergea.com
```

2. Localhost certificates need to be issued using a cli tool like `mkcert`. There are numerous guides online on how to do this, here is one guide for macOS (there are other similar guides for windows etc.). The correct command should take into account test alias (not 'localhost'):

```
mkcert -key-file booking-local.test.cergea.com-key.pem -cert-file booking-local.test.cergea.pem booking-local.test.cergea.com
```

3. The end result of this process is to produce `booking-local.test.cergea.com.pem` and `booking-local.test.cergea.com-key.pem` files, which should then be placed inside `colinsonx-web/apps/booking` directory.

4. A .env.local should be placed inside `collinsonx-web/apps/booking` containing all the necessary secrets. Please talk to the team to obtain a copy.

5. Once everything is in place, you are in `dev` branch, pulled latest changes and ran `pnpm i`, you need to run `pnpm dev:test --filter booking`.

UI will be accessible in HTTPS in the following link:
https://booking-local.test.cergea.com:4011

## Mandatory URL parameters

According to latest spec these parameters must be present in the URL:

- `lc` lounge code
- `in` JWT token

- [Example URL](https://bookin.test.cergea.com:4011/?lc=BHX7&in=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..tfBDVDCmiSMP2utPtIsMxA.vWUxTCrBq5pN6RXc4UQLeuyzunLE--IJrwSkOCp8sDHRk5EcOWpjddaJOYur6m_s88w6ibEvvg17HhbDUX89Ugz4NXzrN6SfwoTx0KPmpN5C0tFDEaoO6RXBU0-yU_JdVaszv2BDGLQojkgaQfRasXdMUzxhx4wVIvuHewY7WAvAVSRCPJXq6VvNlT4UpcKrDRVm39nvyPU4C2k2NJ-k06Kpdk8__uY9MVLg8luStkjniCGdPAwrWLrWzQj70NwGnmC6vBSUkiiOEmO6hr1-AFlWM1048ruxqN-7t_JhmRPMk82fl9Jpeoc5onpb8v03hzjmRW8kD9SIJSHBJhxrOdUpfOZ25n-t3XPRfnnAr3o.tFcnof9c3PT2Z-wXm3Pfig)

- [How we redirect to the Bridge App (Confluence page)](https://lifestyle-x-wiki.atlassian.net/wiki/spaces/BAAS/pages/97419266/How+will+we+redirect+to+the+Bridge+App)
