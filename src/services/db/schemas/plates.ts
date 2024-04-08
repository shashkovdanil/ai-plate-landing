import { sql } from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	serial,
	text,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const plates = pgTable(
	"plates",
	{
		id: serial("id").primaryKey(),
		food: varchar("food").notNull(),
		calories: integer("calories").notNull(),
		proteins: integer("proteins").notNull(),
		fats: integer("fats").notNull(),
		carbs: integer("carbs").notNull(),
		eaten: integer("eaten").notNull(),
		createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
		updatedAt: text("updated_at"),
		date: text("date").default(sql`CURRENT_TIMESTAMP`).notNull(),
		userId: varchar("user_id", { length: 32 }).notNull(),
	},
	(table) => {
		return {
			date: index("date_idx").on(table.date),
			userIdx: index("user_idx").on(table.userId),
		};
	},
);

export const plateSchema = createSelectSchema(plates);
export const insertPlateSchema = createInsertSchema(plates);
export const updatePlateSchema = createInsertSchema(plates).omit({
	userId: true,
});

export type Plate = z.infer<typeof plateSchema>;
export type InsertPlate = z.infer<typeof insertPlateSchema>;
export type UpdatePlate = z.infer<typeof updatePlateSchema>;
