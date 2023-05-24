import express from "express";
const router  =express.Router();
import {createTour, deleteTour, getRelatedTours, getTour, getTours, getToursBySearch, getToursByTag, getToursByUser, likeTour, updateTour} from "../controllers/tour.js";

import auth from "../middleware/auth.js"
router.post("/",auth, createTour);
router.delete("/:id", auth, deleteTour);
router.patch("/:id", auth, updateTour);
router.get("/usertours/:id",auth, getToursByUser);
router.patch("/like/:id", auth, likeTour);

router.get("/search", getToursBySearch);
router.get("/tag/:tag", getToursByTag);
router.post("/relatedtours", getRelatedTours);
router.get("/", getTours);
router.get("/:id", getTour);
export default router;