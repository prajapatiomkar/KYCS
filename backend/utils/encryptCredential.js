import bcrypt from "bcryptjs";

const encryptCredential = async (password, salt) => {
  const encrypt = await bcrypt.hash(password, salt);
  return encrypt;
};
export default encryptCredential;
