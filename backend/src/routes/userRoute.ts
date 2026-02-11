import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getProfile,updateProfile,forgotPassword,resetPassword,getAllUsers} from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';
import { hasRole } from "../middleware/hasRole";
const router = Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Logout route
router.post('/logout', authenticateToken, logoutUser);

// Route to get user profile
router.get('/profile',authenticateToken, getProfile);

// Route to update user profile
router.put('/update-profile', authenticateToken, updateProfile);
// Route to get usre
router.get('/get-all-users', authenticateToken,hasRole("admin") ,getAllUsers);

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
export default router;
