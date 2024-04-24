import { env } from "@/env";
import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
	apiKey: env.ANTHROPIC_API_KEY,
});
