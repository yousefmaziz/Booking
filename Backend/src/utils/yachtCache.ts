import { redisClient } from "../configs/redis.js";

export const invalidateYachtsCache = async () => {
  try {
    if (!redisClient.isReady) {
      console.warn("Redis unavailable, cache invalidation skipped");
      return;
    }

    await redisClient.del("yachts:all");
  } catch (error) {
    console.error("Cache invalidation failed:", error);
  }
};

// ملف لمسح ال cache عن التحديث او حذف المنتج من الداتا بيز
//  redix لو وقعت عادي هيجيب الداتا من الداتا بيز و هيعمل كاش جديد و لو حصلت مشكلة في ال redix هيشتغل عادي من الداتا بيز
