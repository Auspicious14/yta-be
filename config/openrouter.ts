// Path: youtube-automation-backend/config/openrouter.ts

import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

export const openRouter = new OpenAI({
  baseURL: OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY!,
});
