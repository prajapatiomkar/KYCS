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
  getCredentialById,
  deleteCredential,
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
  .post(protect, createCredential)
  .delete(protect, deleteCredential);

router
  .route("/credential/:id")
  .get(protect, getCredentialById)
  .delete(protect, deleteCredential);

export default router;
