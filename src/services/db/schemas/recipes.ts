import { index, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const recipes = pgTable(
	"recipes",
	{
		id: serial("id").primaryKey(),
		recipe: text("recipe").notNull(),
		userId: varchar("user_id", { length: 32 }).notNull(),
	},
	(table) => {
		return {
			userIdx: index("recipe_user_idx").on(table.userId),
		};
	},
);

export const recipeSchema = createSelectSchema(recipes);
export const insertRecipeSchema = createInsertSchema(recipes);

export type Recipe = z.infer<typeof recipeSchema>;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
