import {globalProxy, newSelfBot} from "./client";
import {getConfig} from "./conf";
import {getEnv} from "./env";
import {onReady} from "./onReady";
import {onMessageCreate} from "./onMessageCreate";
import {onMessageDelete} from "./onMessageDelete";
import invariant from "tiny-invariant";

const config = getConfig();
const token = getEnv(config.tokenEnvName);
invariant(token, "token not set");

globalProxy(config.httpProxy);
const selfBot = newSelfBot(config.httpProxy);

selfBot.on("ready", onReady);
selfBot.on("messageCreate", onMessageCreate);
selfBot.on("messageDelete", onMessageDelete);
selfBot.login(token).then();
