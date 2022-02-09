const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');


router.post('/', registerUser )
router.route('/admin').get(protect, admin, getUsers)
router.post('/login',authUser )
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)
router.route('/admin/:id').delete(protect, admin, deleteUser)
router.route('/admin/:id').get(protect, admin, getUserById)
router.route('/admin/:id').put(protect, admin, updateUser)

module.exports = router;