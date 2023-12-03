import {Message, PartialMessage, WebhookMessageOptions} from "discord.js-selfbot-v13";
import {conf, webhookMap} from "@/discord/conf";
import {getTargetIdFromCache, setCache} from "./cacheHelper";

export const webhookSend = async (message: Message) => {
    const attachments = message.attachments.map((item) => item);

    for (const m of conf.inOut) {
        if (!m.hasOwnProperty(message.channelId)) {
            continue;
        }

        for (const outId of m[message.channelId]) {
            const webhook = webhookMap[outId];
            if (!webhook) {
                continue;
            }
            const options: Omit<WebhookMessageOptions, "flags"> = {};
            if (message.content && message.content.trim().length > 0) {
                options.content = message.content;
            }

            if (attachments.length > 0) {
                options.files = attachments;
            }

            if (message.embeds.length > 0) {
                options.embeds = message.embeds;
            }

            if (Object.keys(options).length !== 0) {
                options.username = message.author.globalName ?? message.author.username;
                options.avatarURL = message.author.avatarURL() ?? undefined;

                const res = await webhook.send(options);
                return [webhook.channelId, res.id];

                // .then((res) => {
                //     console.log("👍👍👍 send success");
                //     if (oldMessage) {
                //         setCache(
                //             oldMessage.channelId,
                //             oldMessage.id,
                //             webhook.channelId,
                //             res.id
                //         );
                //     } else {
                //         setCache(message.channelId, message.id, webhook.channelId, res.id);
                //     }
                // })
                // .catch((err) => {
                //     console.error(err);
                // });
            } else {
                console.log("🐽🐽🐽 empty message");
            }
        }
    }
};

export const webhookDelete = async (message: Message | PartialMessage) => {
    switch (message.type) {
        case "DEFAULT":
            for (const m of conf.inOut) {
                if (!m.hasOwnProperty(message.channelId)) {
                    continue;
                }

                for (const outId of m[message.channelId]) {
                    const webhook = webhookMap[outId];
                    if (!webhook) {
                        continue;
                    }
                    const target = getTargetIdFromCache(message.channelId, message.id);
                    if (target) {
                        return webhook.deleteMessage(target);
                        // .then(() => {
                        //     console.log("👍👍👍 delete success");
                        // })
                        // .catch((err) => {
                        //     console.error(err);
                        // });
                    }
                }
            }
            break;
        default:
            break;
    }
};
