import {existsSync, readFileSync, writeFileSync} from "fs";
import {Webhook} from "discord.js-selfbot-v13";

export interface Config {
    isSet: boolean;
    httpProxy?: string;
    socksProxy?: string;
    inOut: Record<string, string[]>[];
    inChannels: string[];
    outChannels: string[];
    tokenEnvName: string;
}

export let conf: Config = {
    isSet: false,
    inOut: [],
    inChannels: [],
    outChannels: [],
    tokenEnvName: "",
};

export const webhookMap: Record<string, Webhook> = {};

export function getConfig(): Config {
    if (conf.isSet) {
        return conf;
    } else {
        console.log("read config.json");
        if (!existsSync("./config.json")) writeFileSync("./config.json", JSON.stringify({}));
        conf = JSON.parse(readFileSync("./config.json").toString());
        const inChannels = conf.inOut.flatMap((item) => Object.keys(item));
        conf.inChannels = inChannels.filter((item, index) => inChannels.indexOf(item) === index);
        const outChannels = conf.inOut
            .flatMap((item) => Object.values(item))
            .join()
            .split(",");
        conf.outChannels = outChannels.filter((item, index) => outChannels.indexOf(item) === index);
        conf.isSet = true;
        return conf;
    }
}
