// @ts-check

import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";

import fsPromises from "node:fs/promises";
import url from "node:url";
import path from "node:path";
import { z } from "zod";
import { env } from "./lib/env.js";

const server = Fastify();

const fileName = url.fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);
const uploadDirectory = path.join(directoryName, "uploads");

async function main() {
    try {
        server.register(fastifyStatic);

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
