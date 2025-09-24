import express from "express";
import { protectRoute } from "../Middleware/auth.middleware.js";
import {
    getUsersForSidebar,
    getMessages,
    sendMessages
} from "../Controllers/message.controller.js";

const router = express.Router();

// Get routes
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

// Post routes
router.post("/send/:id", protectRoute, sendMessages);

export default router;