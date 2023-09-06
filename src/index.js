// @ts-check

import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import url from "node:url";
import path from "node:path";
import { env } from "./lib/env.js";

const server = Fastify();

const fileName = url.fileURLToPath(import.meta.url);
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
