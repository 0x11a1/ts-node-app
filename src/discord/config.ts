import {existsSync, readFileSync, writeFileSync} from "fs";

export type ChannelId = string;
export type ChannelsIds = ChannelId[];

export interface Config {
    httpProxy?: string;
    outputChannels?: ChannelsIds;
    allowedGuildsIds?: ChannelsIds;
    allowedChannelsIds?: ChannelsIds;
    tokenEnvName?: string;
}

let config: Config | undefined = undefined;

export function getConfig(): Config {
    if (!config) {
        console.log("read config.json");
        if (!existsSync("./config.json"))
            writeFileSync("./config.json", JSON.stringify({}));
        config = JSON.parse(readFileSync("./config.json").toString());
        return config ? config : {};
    } else {
        return config;
    }
}
