import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "wwnt1s9e",
  dataset: "production",
  apiVersion: "2025-01-06",
  useCdn: false,
  token: process.env.SANITY_TOKEN, // Securely use environment variables
});
