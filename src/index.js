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

        server.get("/image/:id", async function (request, reply) {
            const parsedParams = await z
                .object({
                    id: z
                        .string()
                        .regex(/^\d+$/)
                        .transform(function (id) {
                            return Number(id);
                        }),
                })
                .safeParseAsync(request.params);

            const parsedQuery = await z
                .object({ format: z.string().optional() })
                .safeParseAsync(request.query);

            if (!parsedParams.success) {
                return reply.status(400).send({
                    error: parsedParams.error.issues,
                });
            }

            if (!parsedQuery.success) {
                return reply.status(400).send({
                    error: parsedQuery.error.issues,
                });
            }

            const imageFileName = `${parsedParams.data.id}.${
                parsedQuery.data.format || "jpg"
            }`;

            const imagePath = path.join(uploadDirectory, imageFileName);

            return reply.sendFile(imagePath);
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
