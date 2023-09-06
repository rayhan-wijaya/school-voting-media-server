// @ts-check

import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { env } from "./lib/env.js";

const server = Fastify();

async function main() {
    try {
        server.register(fastifyCors, {
            origin: true,
        });

        server.listen({
            host: env.HOST,
            port: env.PORT,
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
