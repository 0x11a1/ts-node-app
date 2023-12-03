import {conf} from "./conf";

export const setCache = (
    srcChannelId: string,
    srcMessageId: string,
    targetChannelId: string,
    targetMessageId: string
) => {
    conf.cache?.set(srcChannelId + ":" + srcMessageId, targetChannelId + ":" + targetMessageId);
};
export const getTargetIdFromCache = (channelId: string, messageId: string): string | undefined => {
    const targetName = conf.cache?.get(channelId + ":" + messageId);
    let targetId: string | undefined;
    if (targetName) {
        targetId = targetName.split(":").pop();
    }
    return targetId;
};
