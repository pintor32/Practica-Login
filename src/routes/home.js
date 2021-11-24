const express = require('express');
const router = express.Router();
const { navigationController } = require('../controller')

//multer
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../public/img"));
    },
    filename: function(req, file, cb) {
        const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

router.get('/',navigationController.getHome)
router.get('/login',navigationController.login)
router.post('/login',navigationController.loginProcess)
router.get('/register',navigationController.register)
router.post('/registerUser', navigationController.store)
router.get('/userProfile', navigationController.profile)
router.get('/userList', navigationController.userList)


module.exports = router;