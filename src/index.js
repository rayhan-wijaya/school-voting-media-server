// @ts-check

import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";

import fsPromises from "node:fs/promises";
import url from "node:url";
import path from "node:path";
import { env } from "./lib/env.js";

const server = Fastify();

const fileName = url.fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);

async function main() {
    try {
        server.register(fastifyCors, {
            origin: true,
        });

        server.register(fastifyMultipart);

        server.post("/upload", function (request, reply) {
            fsPromises.writeFile(path.join(directoryName));
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
