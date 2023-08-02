const express = require('express');
const cors = require('cors');
//const cookieParser = require('cookie-parser');
const credentials = require('../middleware/credentials.js');
const corsOption = require('../config/corsOption.js');
const authRoutes = require("../routes/auth.js");
const userRoutes = require("../routes/users.js");
const postRoutes = require("../routes/posts.js");

// Handle File/photo
const multer = require("multer");
const path = require("node:path");;
const { createPost } = require("../controllers/posts.js");
const { register } = require("../controllers/auth.js");
const { verifyToken } = require("../middleware/auth.js");


module.exports = function (app){
    /* File Storage */
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "../client/public/assets");
        },
        filename : function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
    const upload = multer({ storage })

    app.use(credentials);
    app.use(cors(corsOption));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(express.json({ limit: '50mb' }));
    
    //app.use(express.static('public'));
    app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

    /* Routes with files */
    app.post("/auth/register", upload.single("picture"), register)
    app.post("/posts", verifyToken, upload.single("picture"), createPost)

        /* Routes */
    app.use("/auth", authRoutes);
    app.use("/users", userRoutes);
    app.use("/posts", postRoutes);

}