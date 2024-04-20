import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	generates: {
		"./src/__generated__/resolvers-types.ts": {
			plugins: ["typescript", "typescript-resolvers"],
			config: {
				avoidOptionals: true,
				enumsAsTypes: true,
			},
		},
	},
	schema: "./src/schema.ts",
};
export default config;
