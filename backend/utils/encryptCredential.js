import jwt from "jsonwebtoken"



const encryptCredential = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.CREDENTIAL_SECRET, {
        expiresIn: "1d",
    });
    
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    });
}

export default encryptCredential;
