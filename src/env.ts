import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url().startsWith("postgresql://"),
		CLERK_WEBHOOK_SECRET: z.string().startsWith("whsec_").length(38),
    OPENAI_API_KEY: z.string().startsWith("sk-"),
	},
	client: {},
	experimental__runtimeEnv: {},
});
