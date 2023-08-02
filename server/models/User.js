const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
    {
       firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
       },
       lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
       },
       email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
       },
       password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
       },
       picturePath: {
        type: String,
        default: ""
       },
       family: {
        type: Array,
        default: []
       },
       location: {
        type: String,
        maxlength: 255
       },
       occupation: {
        type: String,
        maxlength: 255
       },
       refreshToken: {
        type: String
       }
    },
    {timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id}, process.env.jwtPrivateKey, {expiresIn: '1d'});
}

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id}, process.env.jwtRefreshKey, {expiresIn: '1d'});
}

UserSchema.methods.sendAccessToken = function (req, res, accessToken, user) {
    res.header('Authorization', 'Bearer ' + accessToken).status(200).json({ message: 'Login Successful', user, accessToken }) 
}

UserSchema.methods.sendRefreshToken = function (res, refreshToken) {
    res.cookie('JWT', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 //Equals 1 day
    })
}


const User = mongoose.model("User", UserSchema);
module.exports = User;