const isDevelopment = process.env.NODE_ENV === "development";

export const serverBaseUrl =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL ||
  (isDevelopment
    ? "http://localhost:5000"
    : "https://booknook-backend-ivory.vercel.app");
