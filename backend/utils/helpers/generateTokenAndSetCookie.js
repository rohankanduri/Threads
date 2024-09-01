import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn: '15d',
    })

    res.cookie("jwt", token,{
        httpOnly: true, //MORE SECURE
        maxAge: 15 * 24 * 60 * 1000, //15 DAYS
        sameSite: "strict", // CSRF
    })

    return token ;
}

export default generateTokenAndSetCookie;