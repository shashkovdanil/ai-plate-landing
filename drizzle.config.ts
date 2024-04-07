import { defineConfig } from "drizzle-kit";
import { env } from './src/env'

export default defineConfig({
	schema: "./src/services/db/schemas",
	driver: "pg",
	dbCredentials: {
		connectionString: env.DATABASE_URL,
	},
	verbose: true,
	strict: true,
});
