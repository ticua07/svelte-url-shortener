import type { RequestHandler } from "./$types";
import redis from "$lib/redis";
import * as crypto from "crypto";

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		if (!data.url) {
			return new Response(
				JSON.stringify({ message: "Error creating shorten url, missing url parameter" })
			);
		}
		try {
			const valid = new URL(data.url || "");
			if (!(valid.protocol === "https:" || valid.protocol === "http:")) {
				return new Response(
					JSON.stringify({ message: "Error creating shorten url, url must be https or http" })
				);
			}
		} catch (err) {
			// Catch the typeerror that is thrown when url is not valid in new URL
			return new Response(
				JSON.stringify({ message: "Error creating shorten url, url is not valid" })
			);
		}

		const randomID = crypto.randomBytes(16).toString("hex");
		redis.set(randomID.toString(), data.url);

		return new Response(JSON.stringify({ url: randomID }));
	} catch (err) {
		return new Response(JSON.stringify({ message: "Error creating shorten url" }));
	}
};
