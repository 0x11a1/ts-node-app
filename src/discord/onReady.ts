import {Client} from "discord.js-selfbot-v13";


export const onReady = async (client: Client) => {
    console.log(`Logged in as ${client.user?.tag}!`)
}