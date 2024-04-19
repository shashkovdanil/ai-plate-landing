import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url().startsWith("postgresql://"),
		CLERK_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
		OPENAI_API_KEY: z.string().startsWith("sk-"),
		CLERK_SECRET_KEY: z.string().startsWith("sk_"),
	},
	client: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
	},
});
