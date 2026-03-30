export const headers = () => ({
  "x-vercel-protection-bypass": process.env.API_BYPASS_PROTECTION_TOKEN || "",
});
