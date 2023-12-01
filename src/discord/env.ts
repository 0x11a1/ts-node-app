import dotenv from "dotenv";

export interface Env {
    TS_NODE_DISCORD_TOKEN: string;
}

export function getEnv(): Env {
    dotenv.config();
    return process.env as unknown as Env;
}
