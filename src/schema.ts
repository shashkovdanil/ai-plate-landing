import { anthropicApi } from "@/services/anthropic";
import { db, plates, users } from "@/services/db";
import { buildSchema } from "drizzle-graphql";
import { eq } from "drizzle-orm";
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import pick from "lodash/pick";

const { entities } = buildSchema(db);

export const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "Query",
		fields: entities.queries,
	}),
	mutation: new GraphQLObjectType({
		name: "Mutation",
		fields: {
			...entities.mutations,
			generateDailyNormsAndRecommendations: {
				type: entities.queries.usersSingle.type,
				args: {
					where: {
						type: entities.inputs.UsersFilters,
					},
					set: {
						type: entities.inputs.UsersUpdateInput,
					},
				},
				resolve: async (source, args, context, info) => {
					const result =
						await anthropicApi.generateDailyNormsAndRecommendations(
							pick(args.set, [
								"age",
								"gender",
								"weight",
								"height",
								"activityLevel",
								"goal",
								"disabilities",
							]),
						);

					const [user] = await db
						.update(users)
						.set(result)
						.where(eq(users.id, args.where.id.eq))
						.returning();

					return user;
				},
			},
			generatePlate: {
				type: entities.queries.platesSingle.type,
				args: {
					where: {
						type: entities.inputs.PlatesFilters,
					},
					content: {
						type: GraphQLString,
					},
				},
				resolve: async (source, args, context, info) => {
					const result = await anthropicApi.generatePlate(args.content);

					const [plate] = await db
						.insert(plates)
						.values(
							result.map((item) => ({ ...item, userId: args.where.userId.eq })),
						)
						.returning();

					return plate;
				},
			},
		},
	}),
	types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
});
