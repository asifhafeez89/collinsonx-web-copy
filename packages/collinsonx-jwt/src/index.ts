import * as jose from 'jose';
import { JWTPayload } from 'jose';

async function encryptJWT(
  object: JWTPayload,
  secretPhrase: string,
  experationTime: string = '12h'
): Promise<string> {
  const secret = jose.base64url.decode(secretPhrase);

  const jwt = await new jose.EncryptJWT(object)
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setIssuer('urn:collinson:issuer')
    .setAudience('urn:collinson:audience')
    .setExpirationTime(experationTime)
    .encrypt(secret);

  return jwt;
}

async function decryptJWT(jwt: string, secretPhrase: string) {
  const secret = jose.base64url.decode(secretPhrase);

  const { payload, protectedHeader } = await jose.jwtDecrypt(jwt, secret, {
    issuer: 'urn:collinson:issuer',
    audience: 'urn:collinson:audience',
  });

  return {
    payload,
    protectedHeader,
  };
}

export { encryptJWT, decryptJWT };
