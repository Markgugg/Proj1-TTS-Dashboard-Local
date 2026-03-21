export const config = {
  useMockData: process.env.MOCK_DATA !== "false", // default: true — set MOCK_DATA=false to use live API
  tiktokClientId: process.env.TIKTOK_CLIENT_ID ?? "",
  tiktokClientSecret: process.env.TIKTOK_CLIENT_SECRET ?? "",
};
