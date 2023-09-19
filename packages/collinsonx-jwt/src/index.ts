import * as jose from 'jose';
import { JWTPayload } from 'jose';

async function signJWT(
  object: JWTPayload,
  secretPhrase: string,
  expirationTime: string = '12h'
): Promise<string> {
  const alg = 'HS256';

  const secret = new TextEncoder().encode(secretPhrase);

  const jwt = await new jose.SignJWT(object)
    .setProtectedHeader({ alg })
    .setExpirationTime(expirationTime)
    .sign(secret);

  return jwt;
}

async function verifyJWT(jwt: string, secretPhrase: string) {
  const secret = new TextEncoder().encode(secretPhrase);

  const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret);

  return { payload, protectedHeader };
}

export { signJWT, verifyJWT };
