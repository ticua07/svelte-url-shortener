import { default as Redis } from "ioredis";
import { config } from "dotenv";

// dotenv
config();

const redis = new Redis({
	password: process.env.redis_password
});

export default redis;
