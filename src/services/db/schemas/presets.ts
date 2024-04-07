import { index, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const presets = pgTable(
	"presets",
	{
		id: serial("id").primaryKey(),
		plateId: integer("plate_id").notNull(),
	},
	(table) => {
		return {
			plateIdx: index("plate_idx").on(table.plateId),
		};
	},
);

export const presetSchema = createSelectSchema(presets);
export const insertPresetSchema = createInsertSchema(presets);

export type Preset = z.infer<typeof presetSchema>;
export type InsertPreset = z.infer<typeof insertPresetSchema>;
