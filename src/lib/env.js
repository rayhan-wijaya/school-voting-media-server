// @ts-check

import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";
import "dotenv/config.js";

export const env = createEnv({
    server: {
        HOST: z.string(),
        PORT: z
            .string()
            .regex(/^\d+$/)
            .transform(function (port) {
                return Number(port);
            }),
    },
    runtimeEnvStrict: {
        HOST: process.env.HOST,
        PORT: process.env.PORT,
    },
});
