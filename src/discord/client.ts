import {Client} from "discord.js-selfbot-v13";
import {HttpsProxyAgent} from "https-proxy-agent";
import {default as gproxy} from "node-global-proxy";

export const newSelfBot = (httpProxy?: string): Client => {
    if (httpProxy) {
        const agent = new HttpsProxyAgent(httpProxy);
        return new Client({
            checkUpdate: false,
            http: {agent: agent},
        })
    } else {
        return new Client({
            checkUpdate: false,
        })
    }
}

export const globalProxy = (httpProxy?: string) => {
    if (httpProxy) {
        gproxy.setConfig({
            http: httpProxy,
            https: httpProxy,
        });
        gproxy.start();
    }
}

