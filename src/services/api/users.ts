import { db, users } from "@/services/db";
import type { InsertUser, UpdateUser } from "@/services/db/schemas/users";
import { generateRecommendations } from "@/services/openai/generate-recommendations";
import { eq } from "drizzle-orm";

export const usersApi = {
	async create(data: InsertUser) {
		try {
			const [user] = await db.insert(users).values(data).returning();

			return user as NonNullable<typeof user>;
		} catch (error) {
			console.error(`Can't create user with data: ${data}. Error: ${error}`);
			throw error;
		}
	},
	async update(id: string, data: UpdateUser) {
		try {
			const [user] = await db
				.update(users)
				.set(data)
				.where(eq(users.id, id))
				.returning();

			return user as NonNullable<typeof user>;
		} catch (error) {
			console.error(
				`Can't update user with data: ${JSON.stringify(data)}. ${error}`,
			);
			throw error;
		}
	},
	async generateRecommendations(id: string) {
		try {
			const user = await db.query.users.findFirst({
				where: eq(users.id, id),
			});

			if (!user) {
				throw new Error(`User with id: ${id} not found`);
			}

			if (
				!user.age ||
				!user.gender ||
				!user.weight ||
				!user.height ||
				!user.activityLevel ||
				!user.goal
			) {
				throw new Error(`User with id: ${id} has missing data`);
			}

			const { data } = await generateRecommendations({
				age: user.age,
				gender: user.gender,
				weight: user.weight,
				height: user.height,
				activityLevel: user.activityLevel,
				goal: user.goal,
				disabilities: user.disabilities,
			});

			const [updated] = await db.update(users).set(data).returning();

			return updated as NonNullable<typeof updated>;
		} catch (error) {
			console.error(
				`Can't generate recommendations for user with id: ${id}. Error: ${error}`,
			);
			throw error;
		}
	},
	async delete(id: string) {
		try {
			await db.delete(users).where(eq(users.id, id));
		} catch (error) {
			console.error(`Can't delete user with id: ${id}. Error: ${error}`);
			throw error;
		}
	},
};
