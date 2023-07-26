import express from "express";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  createCredential,
  getCredentials,
  getCredentialById,
  deleteCredential,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

//Public Routes
router.post("/login", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/:userid", getCredentials);

//Private Routes

router.post("/add-account", protect, createCredential);
router.delete("/delete-account/:id", protect, deleteCredential);
router.get("/view-account/:id", protect, getCredentialById);
router.get("/edit-account/:id", protect, getCredentialById);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
