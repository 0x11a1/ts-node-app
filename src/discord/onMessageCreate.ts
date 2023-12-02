import {
    Collection,
    Message,
    MessageAttachment,
    MessageEmbed,
    Snowflake,
} from "discord.js-selfbot-v13";
import {conf, webhookMap} from "./conf";
import {formatSize} from "@/utils";
import {SocksProxyAgent} from "socks-proxy-agent";
import superagent from "superagent";
import dayjs from "dayjs";

export const onMessageCreate = async (message: Message) => {
    if (message.guildId && message.channelId && conf.inChannels.includes(message.channelId)) {
        let render = "";
        render += message.content;
        const [strEmbeds, embedImages] = handleEmbeds(message.embeds);

        if (strEmbeds.length != 0) render += strEmbeds.join("");

        const [strAttachments, attachImages] = handleAttachments(message.attachments);

        if (strAttachments.length != 0) render += strAttachments.join("");
        const images = embedImages.concat(attachImages);
        console.log(render);
        webhookSend(message);
    }
};

const webhookSend = async (message: Message) => {
    // const attachments: MessageAttachment[] = [];
    // for (const item of message.attachments.values()) {
    //     attachments.push(item);
    // }

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

            const res = await webhook.send({
                content: message.content,
                files: attachments,
                username: message.author.globalName ?? message.author.username,
                avatarURL: message.author.avatarURL() ?? "",
                // embeds: message.embeds,
            });
            console.log(res);
        }
    }
};

const handleAttachments = (
    attachments: Collection<Snowflake, MessageAttachment>
): [string[], string[]] => {
    const strAttachments: string[] = [];
    const images: string[] = [];

    attachments.forEach((attachment) => {
        if (attachment.contentType?.startsWith("image")) return images.push(attachment.url);

        strAttachments.push(
            `Attachment:\n  Name: ${attachment.name}\n${
                attachment.description ? `	Description: ${attachment.description}\n` : ""
            }  Size: ${formatSize(attachment.size)}\n  Url: ${attachment.url}`
        );
    });

    return [strAttachments, images];
};

const handleEmbeds = (embeds: MessageEmbed[]): [string[], string[]] => {
    const images: string[] = [];
    const strEmbeds = embeds.map((embed: MessageEmbed) => {
        let stringEmbed = "Embed:\n";

        if (embed.title) stringEmbed += `  Title: ${embed.title}\n`;
        if (embed.description) stringEmbed += `  Description: ${embed.description}\n`;
        if (embed.url) stringEmbed += `  Url: ${embed.url}\n`;
        if (embed.color) stringEmbed += `  Color: ${embed.color}\n`;
        if (embed.timestamp) stringEmbed += `  Url: ${embed.timestamp}\n`;

        const allFields = ["  Fields:\n"];

        embed.fields.forEach((field) => {
            let stringField = "    Field:\n";

            if (field.name) stringField += `      Name: ${field.name}\n`;
            if (field.value) stringField += `      Value: ${field.value}\n`;

            allFields.push(stringField);
        });

        if (allFields.length != 1) stringEmbed += `${allFields.join("")}`;
        if (embed.thumbnail) stringEmbed += `  Thumbnail: ${embed.thumbnail.url}\n`;
        if (embed.image) {
            stringEmbed += `  Image: ${embed.image.url}\n`;
            images.push(embed.image.url);
        }
        if (embed.video) stringEmbed += `  Video: ${embed.video.url}\n`;
        if (embed.author) stringEmbed += `  Author: ${embed.author.name}\n`;
        if (embed.footer) stringEmbed += `  Footer: ${embed.footer.iconURL}\n`;

        return stringEmbed;
    });

    return [strEmbeds, images];
};
