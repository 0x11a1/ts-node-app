import dotenv from "dotenv";

dotenv.config();

export function getEnv(name?: string): string {
    return name ? process.env[name] ?? "" : "";
}
