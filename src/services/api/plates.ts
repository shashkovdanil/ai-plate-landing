import { db, plates } from "@/services/db";
import type { InsertPlate, UpdatePlate } from "@/services/db/schemas/plates";
import { setupPlate } from "@/services/openai";
import { and, eq, sql } from "drizzle-orm";

export const platesApi = {
	async getByDate(date: string, userId: string) {
		try {
			const plate = await db.query.plates.findFirst({
				where: and(
					sql`date(${plates.date}) = date(${date})`,
					eq(plates.userId, userId),
				),
			});

			if (!plate) {
				throw new Error(`Plate for date ${date} not found`);
			}

			return plate;
		} catch (error) {
			console.error(`Can't read plate. Error: ${error}`);
			throw error;
		}
	},
	async getByUserId(userId: string) {
		try {
			const plate = await db.query.plates.findMany({
				where: eq(plates.userId, userId),
			});

			if (!plate) {
				throw new Error(`Plate with for user ${userId} not found`);
			}

			return plate;
		} catch (error) {
			console.error(`Can't read plate. Error: ${error}`);
			throw error;
		}
	},
	async createWithAI(text: string, userId: string) {
		try {
			const { data } = await setupPlate(text);

			const [plate] = await db
				.insert(plates)
				.values(data.map((item) => ({ ...item, userId })))
				.returning();

			return plate as NonNullable<typeof plate>;
		} catch (error) {
			console.error(`Can't create plate. Error: ${error}`);
			throw error;
		}
	},
	async createManually(data: InsertPlate) {
		try {
			const plate = await db.insert(plates).values(data).returning();

			return plate as NonNullable<typeof plate>;
		} catch (error) {
			console.error(`Can't create plate. Error: ${error}`);
			throw error;
		}
	},
	async update(data: UpdatePlate & { id: number }) {
		try {
			const plate = await db.update(plates).set(data).returning();

			return plate as NonNullable<typeof plate>;
		} catch (error) {
			console.error(`Can't update plate. Error: ${error}`);
			throw error;
		}
	},
};

export const functions = [
	"getByDate",
	"createManually",
	"createWithAI",
	"getByUserId",
	"update",
] satisfies (keyof typeof platesApi)[];
