import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  socket: {
    connectTimeout: 3000,
    reconnectStrategy: (retries) => {
      if (retries >= 3) {
        return false;
      }

      return Math.min(retries * 500, 2000);
    },
  },
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis Connected Successfully");
  } catch (error) {
    console.error("Redis initial connection failed:", error);
  }
};

// انشاء اتصال بقاعدة البيانات عند بدء تشغيل التطبيق و إعادة الاتصال عند انقطاع الاتصال وتحديد مده اعاده الاتصال
// وعدد مرات اعاده الاتصال ووقت الانتظار بين كل محاوله واخرى
