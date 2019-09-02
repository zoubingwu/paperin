import * as crypto from 'crypto';

export function hashPassword(original: string) {
  return crypto.createHmac('sha256', original).digest('hex');
}
