import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url().startsWith("postgres://"),
		CLERK_WEBHOOK_SECRET: z.string().startsWith("whsec_").length(38),
	},
	client: {},
	experimental__runtimeEnv: {},
});
