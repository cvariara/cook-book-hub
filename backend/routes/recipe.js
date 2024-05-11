import { Router } from "express";

const router = Router();

router.get("/recipe", (req, res) => {
  res.json({ mssg: "Recipe route" })
})

export default router;