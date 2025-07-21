import { v4 as uuidv4 } from 'uuid';
import { LogInfo, LogDebug, LogWarn, LogError, LogSuccess } from '../middleware/logger';

const db = new Map();

export const createShortURL = ({ longUrl, customCode, expiry }) => {
  LogInfo("Creating short URL", { longUrl, customCode, expiry });

  const code = customCode || uuidv4().slice(0, 6);
  const expirationTime = Date.now() + (expiry || 30) * 60000;

  if (db.has(code)) {
    LogError("Shortcode already exists", code);
    throw new Error("Shortcode already exists");
  }

  db.set(code, { longUrl, expirationTime });
  LogDebug("Short URL saved to memory", { code, longUrl, expirationTime });

  return code;
};

export const getLongURL = (code) => {
  LogInfo("Resolving short URL", code);

  if (!db.has(code)) {
    LogError("Shortcode not found", code);
    throw new Error("Shortcode does not exist");
  }

  const { longUrl, expirationTime } = db.get(code);

  if (Date.now() > expirationTime) {
    db.delete(code);
    LogWarn("Shortcode expired and deleted", code);
    throw new Error("Shortcode expired");
  }

  LogSuccess("Shortcode resolved successfully", { code, longUrl }); // ✅ now defined
  return longUrl;
};

export const getAllShortLinks = () => {
  LogDebug("Fetching all short links");
  return Array.from(db.entries()).map(([code, data]) => ({
    code,
    ...data,
  }));
};
