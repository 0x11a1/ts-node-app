import {Message} from "discord.js-selfbot-v13";
import {getConfig} from "@/discord/config";

export const onMessageCreate = async (message: Message) => {
    const config = getConfig()

    if (
        config.allowedGuildsIds != undefined &&
        config.allowedGuildsIds?.length != 0 &&
        !config.allowedGuildsIds?.includes(message.guildId) &&
        !config.allowedGuildsIds?.includes(Number(message.guildId))
    )
        return;
}