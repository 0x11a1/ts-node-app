import {Message, PartialMessage} from "discord.js-selfbot-v13";
import {conf} from "@/discord/conf";

export const onMessageDelete = async (message: Message | PartialMessage) => {
    if (!(message.guildId && message.channelId && conf.inChannels.includes(message.channelId))) {
        return;
    }

    console.log(message);
};
