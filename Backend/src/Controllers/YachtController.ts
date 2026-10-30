// هنا التحكم في عمليات اليخوت، مثل إنشاء يخوت جديدة، الحصول على جميع اليخوت، تحديث اليخوت وحذفها.
import type { Request, Response } from "express";
import {
  createYachtService,
  getAllYachtsService,
  getYachtByIdService,
  updateYachtService,
  deleteYachtService,
} from "../services/YachtService.js";
import { redisClient } from "../configs/redis.js";
import { invalidateYachtsCache } from "../utils/yachtCache.js";

export const createYacht = async (req: Request, res: Response) => {
  try {
    const { name, description, pricePerDay, location, capacity } = req.body;

    if (!name || !description || !pricePerDay || !location || !capacity) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newYacht = await createYachtService(req.body);
    await invalidateYachtsCache();
    res.status(201).json({
      message: "Yacht created successfully",
      yacht: newYacht,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create yacht",
    });
  }
};

export const getAllYachts = async (req: Request, res: Response) => {
  try {
    const cacheKey = "yachts:all";

    // 1. Try reading from Redis
    try {
      if (redisClient.isReady) {
        const cachedYachts = await redisClient.get(cacheKey);

        if (cachedYachts) {
          console.log("CACHE HIT");

          return res.status(200).json(JSON.parse(cachedYachts));
        }

        console.log("CACHE MISS");
      }
    } catch (error) {
      console.error("Redis read failed:", error);
    }

    // 2. Get yachts from MongoDB
    const yachts = await getAllYachtsService();

    // 3. Try storing data in Redis
    try {
      if (redisClient.isReady) {
        await redisClient.setEx(cacheKey, 60, JSON.stringify(yachts));
      }
    } catch (error) {
      console.error("Redis write failed:", error);
    }

    // 4. Return MongoDB data
    return res.status(200).json(yachts);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching yachts",
    });
  }
};
export const getYachtById = async (req: Request, res: Response) => {
  try {
    const yacht = await getYachtByIdService(req.params.id);
    if (!yacht) {
      return res.status(404).json({ error: "Yacht not found" });
    }
    res.status(200).json(yacht);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch yacht",
    });
  }
};

export const updateYacht = async (req: Request, res: Response) => {
  try {
    const updatedYacht = await updateYachtService(req.params.id, req.body);
    if (!updatedYacht) {
      return res.status(404).json({ error: "Yacht not found" });
    }
    await invalidateYachtsCache();
    res
      .status(200)
      .json({ message: "Yacht updated successfully", yacht: updatedYacht });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update yacht",
    });
  }
};

export const deleteYacht = async (req: Request, res: Response) => {
  try {
    const deletedYacht = await deleteYachtService(req.params.id);
    if (!deletedYacht) {
      return res.status(404).json({ error: "Yacht not found" });
    }
    await invalidateYachtsCache();
    res
      .status(200)
      .json({ message: "Yacht deleted successfully", yacht: deletedYacht });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete yacht",
    });
  }
};
