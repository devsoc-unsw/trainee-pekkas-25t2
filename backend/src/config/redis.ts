import { createClient } from "redis";
import { RedisStore } from "connect-redis";

const redisClient = createClient({
  url: `redis://localhost:${process.env["REDIS_PORT"]}`,
});

redisClient.connect().catch(console.error);

// Export a preconfigured RedisStore
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:",
});

export { redisClient, redisStore };
