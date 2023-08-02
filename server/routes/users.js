const express = require('express');
const { getUser, getUserFamily, addRemoveFriend } = require("../controllers/users.js");
const { verifyToken } = require("../middleware/auth.js");


const router = express.Router();

/*  Read  */
router.get('/:id', verifyToken, getUser);
router.get('/:id/family', verifyToken, getUserFamily);

/*  Update  */
router.patch('/:id/:familyId', verifyToken, addRemoveFriend);

module.exports = router;