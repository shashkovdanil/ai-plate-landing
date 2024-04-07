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
		id: varchar("id", { length: 32 }).notNull().primaryKey(),
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
		metabolicRate: integer("metabolic_rate"),
		dailyCalories: integer("daily_calories"),
		dailyProteins: integer("daily_proteins"),
		dailyFats: integer("daily_fats"),
		dailyCarbs: integer("daily_carbs"),
		recommendations: text("recommendations"),
		fullAccess: boolean("full_access").default(false),
	},
	(table) => {
		return {
			idIdx: index("id_idx").on(table.id),
		};
	},
);

export const userSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
