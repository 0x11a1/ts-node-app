import {Message, PartialMessage} from "discord.js-selfbot-v13";
import {isListening} from "@/discord/isListening";
import {webhookDelete, webhookSend} from "@/discord/webhook";
import {setCache} from "@/discord/cacheHelper";

export const onMessageEdit = async (
    oldMessage: Message | PartialMessage,
    newMessage: Message | PartialMessage
) => {
    if (!isListening(newMessage)) {
        return;
    }

    try {
        if (oldMessage instanceof Message && newMessage instanceof Message) {
            await webhookDelete(oldMessage);
            const res = await webhookSend(newMessage);
            if (res) {
                const [cid, id] = res;
                setCache(oldMessage.channelId, oldMessage.id, cid, id);
                console.log("✅✅✅ message edit success");
            }
        }
    } catch (err) {
        console.error(err);
    }
};
