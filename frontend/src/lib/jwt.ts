import {decode} from 'base-64';

export function base64UrlDecode(input: string): string {
  const base64Decoded = decode(input.replace(/-/g, '+').replace(/_/g, '/'));
  return base64Decoded;
}

export function decodeJWT(token: string): any | null {
  try {
    const [headerB64, payloadB64] = token.split('.').slice(0, 2);

    if (!payloadB64) {
      return null;
    }

    const decodedPayload = JSON.parse(base64UrlDecode(payloadB64));
    return decodedPayload;
  } catch (error) {
    return null;
  }
}
