import { Router } from "express";
import {
  addRegistration,
  getAllRegistrations,
  getUserRegistrations,
  deleteRegistration,
searchRegistrationsByTitle
} from "../controllers/registrationController";
import { authenticateToken } from "../middleware/authMiddleware";
import { hasRole } from "../middleware/hasRole";

const router: Router = Router();

router.post("/", authenticateToken, hasRole("user"), addRegistration);
router.get("/all", authenticateToken, hasRole("admin"), getAllRegistrations);
router.get("/my", authenticateToken, hasRole("user"), getUserRegistrations);
router.delete("/:id", authenticateToken, hasRole("user","admin"), deleteRegistration);
router.get('/search', authenticateToken,hasRole("admin"),  searchRegistrationsByTitle);


export default router;
