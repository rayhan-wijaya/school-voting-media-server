// @ts-check

import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";

import fs from "node:fs";
import fsPromises from "node:fs/promises";
import url from "node:url";
import path from "node:path";
import { env } from "./lib/env.js";

const server = Fastify();

const fileName = url.fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);
const uploadDirectory = path.join(directoryName, "..", "uploads");

async function main() {
    try {
        server.register(fastifyStatic, {
            root: uploadDirectory,
            prefix: "/image/",
        });

        server.register(fastifyCors, {
            origin: true,
        });

        server.register(fastifyMultipart, {
            attachFieldsToBody: true,
        });

        server.post("/image/upload", async function (request, reply) {
            /**
             * @typedef {object} UploadRequestBody
             * @property {import("@fastify/multipart").MultipartFile | undefined} image
             */

            const body =
                /**
                 * @type {UploadRequestBody}
                 */
                (request.body);

            if (!body?.image) {
                return reply.status(400).send({
                    error: "No image",
                });
            }

            const imagePath = path.join(uploadDirectory, body.image.filename);
            let message = fs.existsSync(imagePath)
                ? "Overrided image"
                : "Created image";

            try {
                await fsPromises.writeFile(
                    imagePath,
                    await body.image.toBuffer()
                );
            } catch (error) {
                return reply.status(500).send({
                    error: "Internal server error",
                });
            }

            return reply.status(200).send({
                message,
            });
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
