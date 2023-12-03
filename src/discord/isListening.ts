import {Message, PartialMessage} from "discord.js-selfbot-v13";
import {conf} from "@/discord/conf";

export const isListening = (message: Message | PartialMessage): boolean => {
    return !!(message.guildId && message.channelId && conf.inChannels.includes(message.channelId));
};
