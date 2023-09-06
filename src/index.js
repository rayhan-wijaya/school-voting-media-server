// @ts-check

import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { env } from "./lib/env.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

const server = Fastify();

const fileName = fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);

async function main() {
    try {
        server.register(fastifyStatic, {
            root: path.join(directoryName, "uploads"),
            prefix: "/image/",
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
