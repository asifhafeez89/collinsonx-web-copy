import * as jose from 'jose';
import { JWTPayload } from 'jose';

const secret = jose.base64url.decode(
  'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI'
);

async function encryptJWT(object: JWTPayload): Promise<string> {
  const jwt = await new jose.EncryptJWT(object)
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .encrypt(secret);

  return jwt;
}

async function decryptJWT(jwt: string) {
  const { payload, protectedHeader } = await jose.jwtDecrypt(jwt, secret, {
    issuer: 'urn:example:issuer',
    audience: 'urn:example:audience',
  });

  return {
    payload,
    protectedHeader,
  };
}

export { encryptJWT, decryptJWT };
