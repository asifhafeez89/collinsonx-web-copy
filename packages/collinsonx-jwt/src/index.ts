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

function produceJWT(payload: any) {
  return new jose.UnsecuredJWT(payload).encode();
}

function decodeJWT(jwt: string) {
  return jose.decodeJwt(jwt);
}

export { signJWT, produceJWT, decodeJWT };
