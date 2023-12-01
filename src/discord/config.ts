import {existsSync, readFileSync, writeFileSync} from "fs";

export type ChannelId = number | string;
export type ChannelsIds = ChannelId[];

export interface ChannelConfig {
    allowed: ChannelsIds;
}

export interface ChannelConfigs {
    [k: string]: ChannelConfig;
}

export interface Config {
    httpProxy?: string,
    outputChannels?: ChannelsIds;
    allowedGuildsIds?: ChannelsIds;
    allowedChannelsIds?: ChannelsIds;
    allowedUsersIds?: ChannelsIds;
    channelConfigs?: ChannelConfigs;
    showDate?: boolean;
    showChat?: boolean;
    stackMessages?: boolean;
}

let config: Config | undefined = undefined

export function getConfig(): Config {
    if (!config) {
        console.log("read config.json")
        if (!existsSync("./config.json"))
            writeFileSync("./config.json", JSON.stringify({}));
        config = JSON.parse(readFileSync("./config.json").toString());
        return config ? config : {}
    } else {
        return config
    }
}


