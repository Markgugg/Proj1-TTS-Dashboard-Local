export const config = {
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false", // default: true
  tiktokClientId: process.env.TIKTOK_CLIENT_ID ?? "",
  tiktokClientSecret: process.env.TIKTOK_CLIENT_SECRET ?? "",
};
