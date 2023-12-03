import {Message, PartialMessage} from "discord.js-selfbot-v13";
import {isListening} from "@/discord/isListening";
import {webhookDelete} from "@/discord/webhook";

export const onMessageDelete = async (message: Message | PartialMessage) => {
    if (!isListening(message)) {
        return;
    }
    try {
        await webhookDelete(message);
        console.log("👻👻👻 message delete success");
    } catch (err) {
        console.error(err);
    }
};
