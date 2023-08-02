const bcrypt = require("bcrypt");
const User = require("../models/User.js");

/* Register User */
const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            family,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            family,
            location,
            occupation,
            refreshToken: ""
         });
         const savedUser = await newUser.save();
         res.status(201).json(savedUser);

     } catch (err){
        res.status(500).json({ error: err.message })
     }

};

/* Logging in */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne ({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exsist. "});

        const isMatch = await bcrypt.compare (password, user.password);
        if (!isMatch) return res.status(400).json({ msg : "Invalid Credentials " });

        const accessToken = user.generateAuthToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();

        user.sendRefreshToken(res, refreshToken);
        user.sendAccessToken(req, res, accessToken, user);


    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = { register, login }