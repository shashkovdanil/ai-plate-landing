import path from "node:path";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config = {
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
};

export default config;
