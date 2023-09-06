// @ts-check

import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { env } from "./lib/env.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

const server = Fastify();

const fileName = fileURLToPath(import.meta.url);
const directoryName = path.dirname(fileName);
