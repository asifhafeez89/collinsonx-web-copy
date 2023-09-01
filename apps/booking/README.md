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

3. The end result of this process is to produce `booking-local.test.cergea.com.pem` and `booking-local.test.cergea.com-key.pem` files, which should then be placed inside `colinsonx-web/apps/booking-management` directory

4. A .env.local should be placed inside `collinsonx-web/apps/booking-management` containing all the necessary secrets. Please talk to the team to obtain a copy.

5. Once everything is in place, you are in `dev` branch, pulled latest changes and ran `pnpm i` , you need to run `pnpm dev:test --filter booking` .

UI will be accessible in HTTPS in the following link:
https://booking-local.test.cergea.com:4011
