const crypto = require('crypto');

const algorithm = 'aes-256-gcm';
const secretKey = process.env.ENCRYPTION_KEY;

if (!secretKey || Buffer.from(secretKey, 'hex').length !== 32) {
  throw new Error('ENCRYPTION_KEY must be set in .env and be a 64-character hex string');
}

function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');

  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag: authTag
  };
}

function decrypt(hash) {
  const decipher = crypto.createDecipheriv(
    algorithm, 
    Buffer.from(secretKey, 'hex'), 
    Buffer.from(hash.iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(hash.authTag, 'hex'));

  let decrypted = decipher.update(hash.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

module.exports = { encrypt, decrypt };