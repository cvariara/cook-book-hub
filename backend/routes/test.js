import { Router } from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/testController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn)

router.get("/should-be-admin", shouldBeAdmin)

export default router;