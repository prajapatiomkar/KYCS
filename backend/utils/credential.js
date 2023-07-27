import CryptoJS from "crypto-js";

const encrypt = (plaintext) => {
  return CryptoJS.AES.encrypt(plaintext, process.env.AES_SECRET);
};
const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.AES_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { encrypt, decrypt };
