import { env } from "@/env";
import { schema } from "@/schema";
import { api } from "@/services/api";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
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

const server = new ApolloServer<Context>({
	schema,
	introspection: true,
});

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
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
