const User = require("../models/User.js");

/*  Read  */
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

const getUserFamily = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const members = await Promise.all(
            user.family.map((id) => User.findById(id))
        );
        const formattedFamily = members.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFamily);
    }
    catch {
        res.status(404).json({ message: err.message });
    }
}

/* Update */
const addRemoveFriend = async (req, res) => {
    try {
        const { id, familyId } = req.params;
        const user = await User.findById(id);
        const family = await User.findById(familyId);

        if (user.family.includes(familyId)) {
            user.family = user.family.filter((id) => id !== id);
            family.family = family.family.filter((id) => id !== id);
        } else {
            user.family.push(familyId);
            family.family.push(id);
        }
        await user.save();
        await family.save();

        
        const members = await Promise.all(
            user.family.map((id) => User.findById(id))
        );
        const formattedFamily = members.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFamily);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = { getUser, getUserFamily, addRemoveFriend };