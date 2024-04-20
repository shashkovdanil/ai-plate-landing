import type { Resolvers } from "@/__generated__/resolvers-types";
import { env } from "@/env";
import { schema } from "@/schema";
import { api } from "@/services/api";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import type { NextRequest } from "next/server";

const client = jwksClient({
	jwksUri: env.JWKS_URI,
});

type Context = {
	req: NextRequest;
	userId: string | undefined;
};

// const resolvers = {
// 	Query: {
// 		me: async (_, __, ctx) => {
// 			if (!ctx.userId) {
// 				throw new GraphQLError("User is not authenticated", {
// 					extensions: {
// 						code: "UNAUTHENTICATED",
// 						http: { status: 401 },
// 					},
// 				});
// 			}

// 			const user = await api.users.getById(ctx.userId);

// 			if (!user) {
// 				throw new GraphQLError("User is not authenticated", {
// 					extensions: {
// 						code: "UNAUTHENTICATED",
// 						http: { status: 401 },
// 					},
// 				});
// 			}

// 			return user;
// 		},
// 	},
// } satisfies Resolvers<Context>;

const server = new ApolloServer<Resolvers>({
	resolvers: {},
	typeDefs: schema,
	introspection: true,
	csrfPrevention: false,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
	context: async (req): Promise<Context> => {
		const defaultContext = {
			req,
			userId: undefined,
		};

		const token =
			req.headers.get("authorization")?.replace("Bearer ", "") || "";

		if (!token) return defaultContext;

		try {
			const key = await client.getSigningKey();
			const decoded = jwt.verify(token, key.getPublicKey());
			const id = decoded.sub as string | undefined;

			if (!id) return defaultContext;

			const user = await api.users.getById(id);

			if (!user) return defaultContext;

			return { req, userId: user.id };
		} catch (error) {
			return defaultContext;
		}
	},
});

export { handler as GET, handler as POST };
