// Common logger utility
const getTime = () => new Date().toLocaleString();

export const LogInfo = (message, data = null) => {
  console.log(`[INFO] [${getTime()}]: ${message}`, data);
};

export const LogError = (message, data = null) => {
  console.error(`[ERROR] [${getTime()}]: ${message}`, data);
};

export const LogWarn = (message, data = null) => {
  console.warn(`[WARNING] [${getTime()}]: ${message}`, data);
};

export const LogSuccess = (message, data = null) => {
  console.log(`%c[SUCCESS] [${getTime()}]: ${message}`, 'color: green; font-weight: bold;', data);
};

export const LogDebug = (message, data = null) => {
  console.debug(`[DEBUG] [${getTime()}]: ${message}`, data);
};
