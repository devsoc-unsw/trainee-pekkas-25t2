import { redisClient, } from "../config/redis";

type SessionData = {
  userId: number
}

/**
 * Validates a given session object, checking if it exists in Redis and if it has expired.
 * @param session The session object to validate.
 * @returns The session object if it is valid, false if it is not.
 */
export const validateSession = async (session: any) => {
  if (!session || !session.id) {
    return false;
  }

  const sessionFromDB = await redisClient.get(`session:${session.id}`);
  if (sessionFromDB === null) {
    return false;
  }

  const sessionData = JSON.parse(sessionFromDB);
  if (sessionData.cookie.expires < Date.now()) {
    await redisClient.del(`session:${session.id}`);
    return false;
  }

  return sessionData as SessionData;
};
