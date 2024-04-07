import { db, users } from "@/services/db";
import type { InsertUser } from "@/services/db/schemas/users";
import { eq } from "drizzle-orm";

export const usersApi = {
	async create(data: InsertUser) {
		try {
			const [user] = await db.insert(users).values(data).returning();

			return user;
		} catch (error) {
			console.error(`Can't create user with data: ${data}. Error: ${error}`);
			throw error;
		}
	},
	async update(id: string, data: InsertUser) {
		try {
			const [user] = await db
				.update(users)
				.set(data)
				.where(eq(users.id, id))
				.returning();

			return user;
		} catch (error) {
			console.error(`Can't update user with data: ${data}. Error: ${error}`);
			throw error;
		}
	},
};
