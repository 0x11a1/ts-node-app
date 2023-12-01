import {globalProxy, newSelfBot} from "./client";
import {getConfig} from "./config";
import {getEnv} from "./env";
import {onReady} from "@/discord/onReady";


const env = getEnv();
const config = getConfig();

globalProxy(config.httpProxy)
const selfBot = newSelfBot(config.httpProxy)

selfBot.on("ready", onReady);

