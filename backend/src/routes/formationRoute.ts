import { Router } from "express";
import {
  addFormation,
  updateFormation,
  deleteFormation,
  getAllFormations,
  searchFormations,
  getFormationById,
} from "../controllers/formationController";
import { authenticateToken } from "../middleware/authMiddleware";
import { hasRole } from "../middleware/hasRole";

const router = Router();

// Public routes
router.get("/", getAllFormations);
router.get("/search", searchFormations);
router.get('/:id', getFormationById); 
// Admin routes
router.post("/", authenticateToken, hasRole("admin"), addFormation);
router.put("/:id", authenticateToken, hasRole("admin"), updateFormation);
router.delete("/:id", authenticateToken, hasRole("admin"), deleteFormation);

export default router;
