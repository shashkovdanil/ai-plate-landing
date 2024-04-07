import { env } from "@/env";
import { api } from "@/services/api";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

export async function POST(request: Request) {
	try {
		const secret = env.CLERK_WEBHOOK_SECRET;

		const headers = request.headers;

		const svix_id = headers.get("svix-id");
		const svix_timestamp = headers.get("svix-timestamp");
		const svix_signature = headers.get("svix-signature");

		if (!svix_id || !svix_timestamp || !svix_signature) {
			return Response.json(
				{ message: "Error occured -- no svix headers" },
				{ status: 400 },
			);
		}

		const wh = new Webhook(secret);

		const body = await request.text();

		const event = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;

		if (event.type === "user.created") {
			await api.users.create({
				id: event.data.id,
				email: event.data.email_addresses[0]?.email_address,
			});
		}

		return Response.json(
			{ success: true, message: "Webhook received" },
			{ status: 200 },
		);
	} catch (error) {
		console.error(error);
		return Response.json({ success: false }, { status: 500 });
	}
}
