const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const { registerUser, loginUser, logout, forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails,
    editUserRole,
    deleteUser

} = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);

router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.get('/me', isAuthenticatedUser, getUserProfile)
router.put('/password/update', isAuthenticatedUser,  updatePassword)
router.put('/me/update', isAuthenticatedUser, upload.single("avatar"), updateProfile)
router.get('/admin/users',  allUsers)
router.get('/admin/user/:id', getUserDetails)
router.put('/editUserRole/:userId',  editUserRole);
router.delete('/deleteUser/:id', deleteUser);


module.exports = router;