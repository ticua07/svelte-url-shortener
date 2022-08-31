import type { RequestHandler } from "./$types";
import { redirect } from "@sveltejs/kit";

import redis from "$lib/redis";

export const GET: RequestHandler = async ({ params }) => {
	const { redirectID } = params;
	const urlToRedirect = await redis.get(redirectID);
	if (redirectID && urlToRedirect !== null) {
		throw redirect(308, urlToRedirect);
	} else {
		throw redirect(308, "/");
	}
};
