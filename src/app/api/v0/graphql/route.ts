import { env } from "@/env";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import type { NextRequest } from "next/server";

const client = jwksClient({
	jwksUri: "https://honest-anemone-52.clerk.accounts.dev/.well-known/jwks.json",
});

const resolvers = {
	Query: {
		hello: () => "world",
	},
};

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const server = new ApolloServer({
	resolvers,
	typeDefs,
	introspection: true,
	csrfPrevention: false,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
	context: async (req) => {
		const token = req.headers.get("authorization")?.replace("Bearer ", "");

		if (!token) {
			return new Response("Unauthorized", { status: 401 });
		}

		try {
			console.log(123);
			const key = await client.getSigningKey();
			const decoded = jwt.verify(token, key.getPublicKey());
			console.log(decoded);
		} catch (error) {
			console.error(error);
			return new Response("Unauthorized", { status: 401 });
		}

		// const d = jwt.verify(
		// 	"eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18yZVlnTXRaeklIOTVkdm96MzFoRTZmeDh2cDciLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MTM1NjA2NTIsImlhdCI6MTcxMzU2MDU5MiwiaXNzIjoiaHR0cHM6Ly9ob25lc3QtYW5lbW9uZS01Mi5jbGVyay5hY2NvdW50cy5kZXYiLCJuYmYiOjE3MTM1NjA1ODIsInNpZCI6InNlc3NfMmZLbkU0ejZCVTA5S29TQkpiOVl2Mm1SbThHIiwic3ViIjoidXNlcl8yZktuRTRIbUtWRjVyc0dOeVN5NGNNRlVvWE4ifQ.gThzZJwPqEfcCnKmjtmIT3bHLYFDjUs0RFdrrWJH0rbCDSEejxn1pzqJCAH8-8lMBjmx69N_XEx2TQiy9OkQ3tT-ntPIgbp88XEZLkfkn7XRW5Gr2z3m4feGhEOz7apHcXMb2G_FTu_uj5IGfgw9oNHUFLbmQnlO4ebS9Pa1hyF4i9eCC3-nNjdv7Uxj1q65T7tjRUBftmBMgAfxSGjfYCn3OZK2QJLAF0IFQzFF0mMj9YP7aryPYh_HWitWO3jwX8LzIx0d_jy2unjk8fMQ2RRWcG5ZQdvxX_kkzBr3bQ8rgJ1aXdVxlSThWgMoZeiPeA4W2jkQTUZ75YvQ6e3neg",
		// 	k.getPublicKey(),
		// 	{
		// 		algorithms: [k.alg],
		// 	},
		// );
		// console.log(d);
		// const token = req.headers.get("Authorization")?.replace("Bearer ", "");

		// if (!token) {
		// 	return new Response("Unauthorized", { status: 401 });
		// }

		// const payload = await clerkClient.verifyToken(token, {});

		// console.log(payload)

		return { req };
	},
});

export { handler as GET, handler as POST };
