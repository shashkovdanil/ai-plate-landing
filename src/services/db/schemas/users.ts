import {
	boolean,
	index,
	integer,
	pgTable,
	text,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const activityLevels = ["none", "low", "moderate", "high"] as const;
export const goals = [
	"weight_loss",
	"muscle_gain",
	"weight_maintenance",
	"health_improvement",
] as const;

export const users = pgTable(
	"users",
	{
		id: varchar("id", { length: 32 }).notNull().primaryKey(), // Clerk user_id
		email: varchar("email"),
		age: integer("age"),
		gender: text("gender", {
			enum: ["male", "female"],
		}),
		weight: integer("weight"),
		height: integer("height"),
		activityLevel: text("activity_level", {
			enum: activityLevels,
		}),
		goal: text("goal", {
			enum: goals,
		}),
		disabilities: varchar("disabilities", { length: 255 }),
		metabolicRate: integer("metabolic_rate"),
		dailyWater: integer("daily_water"),
		dailyCalories: integer("daily_calories"),
		dailyProteins: integer("daily_proteins"),
		dailyFats: integer("daily_fats"),
		dailyCarbs: integer("daily_carbs"),
		nutritionRecommendations: text("nutrition_recommendations"),
		supplementRecommendations: text("supplement_recommendations"),
		fullAccess: boolean("full_access").default(false),
		isFilled: boolean("is_filled").default(false),
	},
	(table) => {
		return {
			idIdx: index("id_idx").on(table.id),
		};
	},
);

export const userSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);
export const updateUserSchema = insertUserSchema.omit({ id: true });

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
