import bcrypt from "bcryptjs";

const passwordEncrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export default passwordEncrypt;