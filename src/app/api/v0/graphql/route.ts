import { env } from "@/env";
import { api } from "@/services/api";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import type { NextRequest } from "next/server";
import schema from "root/public/schema.graphql";

const client = jwksClient({
	jwksUri: env.JWKS_URI,
});

const server = new ApolloServer({
	resolvers: {},
	typeDefs: schema,
	introspection: true,
	csrfPrevention: false,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
	context: async (req) => {
		if (env.NODE_ENV !== "production") {
			return { req };
		}

		const codegen = req.headers.get("codegen");

		if (codegen) {
			return { req };
		}

		const token = req.headers.get("authorization")?.replace("Bearer ", "");

		if (!token)
			throw new GraphQLError("User is not authenticated", {
				extensions: {
					code: "UNAUTHENTICATED",
					http: { status: 401 },
				},
			});

		try {
			const key = await client.getSigningKey();
			const decoded = jwt.verify(token, key.getPublicKey());
			const userId = decoded.sub as string | undefined;

			if (!userId)
				throw new GraphQLError("User is not authenticated", {
					extensions: {
						code: "UNAUTHENTICATED",
						http: { status: 401 },
					},
				});

			const user = await api.users.getById(userId);

			if (!user)
				throw new GraphQLError("User is not authenticated", {
					extensions: {
						code: "UNAUTHENTICATED",
						http: { status: 401 },
					},
				});

			return { req, userId: user.id };
		} catch (error) {
			throw new GraphQLError("User is not authenticated", {
				extensions: {
					code: "UNAUTHENTICATED",
					http: { status: 401 },
				},
			});
		}
	},
});

export { handler as GET, handler as POST };
