import { Buffer } from 'buffer';

export async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  const publicKey = await window.crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey
  );

  const privateKey = await window.crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey
  );

  return {
    publicKey: Buffer.from(publicKey).toString('base64'),
    privateKey: Buffer.from(privateKey).toString('base64')
  };
}

export async function encryptWithPublicKey(data, publicKey) {
  const importedPublicKey = await window.crypto.subtle.importKey(
    "spki",
    Buffer.from(publicKey, 'base64'),
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    importedPublicKey,
    new TextEncoder().encode(data)
  );

  return Buffer.from(encryptedData).toString('base64');
}

export async function decryptWithPrivateKey(encryptedData, privateKey) {
  const importedPrivateKey = await window.crypto.subtle.importKey(
    "pkcs8",
    Buffer.from(privateKey, 'base64'),
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );

  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    importedPrivateKey,
    Buffer.from(encryptedData, 'base64')
  );

  return new TextDecoder().decode(decryptedData);
}