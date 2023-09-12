import * as jose from 'jose';
import { JWTPayload } from 'jose';

const commonHeaders = {
  issuer: 'urn:collinson:issuer',
  audience: 'urn:collinson:audience',
};

const { issuer, audience } = commonHeaders;

async function signJWT(
  object: JWTPayload,
  secretPhrase: string,
  experationTime: string = '12h'
): Promise<string> {
  const alg = 'HS256';

  const secret = new TextEncoder().encode(secretPhrase);

  const jwt = await new jose.SignJWT(object)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(experationTime)
    .sign(secret);

  return jwt;
}

async function verifyJWT(jwt: string, secretPhrase: string) {
  const secret = new TextEncoder().encode(secretPhrase);

  const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret, {
    ...commonHeaders,
  });

  return { payload, protectedHeader };
}

export { signJWT, verifyJWT };
