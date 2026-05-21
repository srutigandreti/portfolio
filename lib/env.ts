type EnvShape = {
  CMS_API_URL?: string;
  CMS_API_TOKEN?: string;
  CONTACT_API_KEY?: string;
  ANALYTICS_ID?: string;
};

const ENV_KEYS: ReadonlyArray<keyof EnvShape> = [
  "CMS_API_URL",
  "CMS_API_TOKEN",
  "CONTACT_API_KEY",
  "ANALYTICS_ID",
];

export function getEnv(): EnvShape {
  const out: EnvShape = {};
  for (const key of ENV_KEYS) {
    out[key] = process.env[key];
  }
  return out;
}

export function requireEnv(key: keyof EnvShape): string {
  const value = process.env[key];
  if (!value || value.length === 0) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
