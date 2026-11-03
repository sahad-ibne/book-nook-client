export const serverBaseUrl =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";
