# Prebook App

## Getting Started

1. The following alias should be placed inside /etc/hosts file:

```
127.0.0.1 booking-local.test.cergea.com
```

2. Localhost certificates need to be issued using a cli tool like `mkcert`. There are numerous guides online on how to do this, here is one guide for macOS (there are other similar guides for windows etc.). The correct command should take into account test alias (not 'localhost'):

```
mkcert -key-file booking-local.test.cergea.com-key.pem -cert-file booking-local.test.cergea.com.pem booking-local.test.cergea.com
```

3. The end result of this process is to produce `booking-local.test.cergea.com.pem` and `booking-local.test.cergea.com-key.pem` files, which should then be placed inside `colinsonx-web/apps/booking` directory.

4. A .env.local should be placed inside `collinsonx-web/apps/booking` containing all the necessary secrets. Please talk to the team to obtain a copy.

5. Once everything is in place, you are in `dev` branch, pulled latest changes and ran `pnpm i`, you need to run `pnpm dev:test --filter booking`.

## Mandatory URL parameters

According to latest spec these parameters must be present in the URL:

- `loungeCode` lounge code
- `linkAccountToken` JWT token

- [Example URL](https://booking.test.cergea.com/?loungeCode=BHX7&linkAccountToken=eyJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lck51bWJlciI6ImhoaGgiLCJtZW1iZXJzaGlwTnVtYmVyIjoiaGhoIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZmlyc3ROYW1lIjoiQWxpY2UiLCJsYXN0TmFtZSI6IlNtaXRoIiwibWVtYmVyc2hpcFR5cGUiOiJIU0JDIiwiYWNjb3VudFByb3ZpZGVyIjoiUFJJT1JJVFlfUEFTUyIsImlhdCI6MTY5NDU5NTM2MywiaXNzIjoidXJuOmNvbGxpbnNvbjppc3N1ZXIiLCJhdWQiOiJ1cm46Y29sbGluc29uOmF1ZGllbmNlIiwiZXhwIjoxNjk0NjM4NTYzfQ.Y48Akqikl9m6GuDWX00UF7UH5tRi2JZXpN7wqRSD1PM)

- [How we redirect to the Bridge App (Confluence page)](https://lifestyle-x-wiki.atlassian.net/wiki/spaces/BAAS/pages/97419266/How+will+we+redirect+to+the+Bridge+App)

## Local development workflow

To ensure you are using the latest valid token schema and parameters for link generation, it is advisable to follow the steps outlined in the [placeholder-app README](https://github.com/CollinsonX/collinsonx-web/blob/dev/apps/placeholder-app/README.md) and start **placeholder-app** dev task locally.

1. Start **booking** dev task locally
2. Start **placeholder-app** dev task locally
3. Visit http://localhost:3012
4. Select **Local** as env
5. Fill-in all the fields in the form
6. Click 'Pre-book' button

NOTE: The secret in the `.env.local` file in both **booking** and **placeholder-app** must be the same. **Please contact the team to obtain the correct secret.**

## Update translations

1. To generate a XLSX file with the English (base translations) translations, run `pnpm translations:generate:xlsx` a file called `generated_translations.xls` should be generated.
2. To convert the updated translations to TS objects we can import, run `pnpm translations:generate:json` and it will update all new translations under `/locales/{language}.ts`;
