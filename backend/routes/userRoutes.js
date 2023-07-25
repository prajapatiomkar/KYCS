import express from "express";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  createCredential,
  getCredential,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

//Public Routes
router.post("/", registerUser);
router.post("/auth", authUser);

router.post("/logout", logoutUser);

//Private Routes
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/credential")
  .get(protect, getCredential)
  .post(protect, createCredential);

export default router;
