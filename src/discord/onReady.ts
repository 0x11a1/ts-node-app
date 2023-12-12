import {Client} from "discord.js-selfbot-v13";
import {conf, webhookMap} from "./conf";
import {IMG_SRC} from "@/consts";
import dayjs from "dayjs";

export const onReady = async (client: Client) => {
    console.log(`Logged in as ${client.user?.tag}!`);

    for (const outId of conf.outChannels) {
        const channel = await client.channels.fetch(outId);
        if (channel?.type === "GUILD_TEXT") {
            const hooks = await channel.fetchWebhooks();
            for (const item of hooks) {
                const [id, hook] = item;
                if (hook.owner?.id === client.user?.id) {
                    webhookMap[channel.id] = hook;
                    break;
                }
            }
            if (!webhookMap.hasOwnProperty(channel.id)) {
                webhookMap[channel.id] = await channel.createWebhook("nodejs_" + dayjs().unix(), {
                    avatar: IMG_SRC["dev"]["nodejs"],
                });
            }
        } else {
            console.log("channel type is not `GUILD_TEXT`");
        }
    }
};
