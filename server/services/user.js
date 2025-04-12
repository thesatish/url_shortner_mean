const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');


const login = async (req) => {
    var { emailId, password } = req.body
    const userData = await User.findOne({ emailId: emailId });
    if (userData) {
        const truePassword = await bcryptjs.compare(password, userData.password);
        if (truePassword) {
            const tokenData = await generateToken(userData._id);
            const userResult = {
                _id: userData._id,
                fullName: userData.fullName,
                userName: userData.userName,
                emailId: userData.emailId,
                token: tokenData
            }
            return { userResult, message: "User Login Success" };
        }
        else {
            return { message: "Wrong Credential" };
        }
    }
    else {
        return { message: "Wrong Credential" };
    }
}

const register = async (req) => {
    req.body.password = await encryptedPassword(req.body.password);
    const userResult = await User.findOne({ emailId: req.body.emailId });
    if (userResult) {
        return { message: "Email Already Exists" };
    }
    else {
        const userInsert = await User.create(req.body);
        const tokenData = await generateToken(userInsert._id);
        userInsert.token = tokenData;
        return { userInsert, message: "User Registered Success" };
    }
}

const generateToken = async (id) => {
    try {
        const token = await jwt.sign({ _id: id }, process.env.SECRET_KEY);
        return token;
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const encryptedPassword = async (password) => {
    try {
        const hashPass = await bcryptjs.hash(password, 10);
        return hashPass;

    } catch (error) {
        console.log("error...", error);
    }
}


module.exports = {
    login,
    register
}