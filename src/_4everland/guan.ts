import mysql from "mysql2/promise";
import {config} from "@/mysql/config";
import {s3} from "./s3";
import {HeadObjectCommandOutput} from "@aws-sdk/client-s3";
import {Types} from "@/_4everland/types";
import {IMG_SRC} from "@/consts/imgSrc";
import dayjs from "dayjs";

export const guan = async (bucketName: string) => {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute<mysql.RowDataPacket[]>(
        `select * from okx_algo where cl_ord_id is not null and algo_cl_ord_id is not null AND state = 4 AND close_avg_px > 0 AND up_state = 1 order by id;`
    );

    if (rows.length > 0) {
        const dd: any = rows[0];
        let notFound = false;
        let obj: HeadObjectCommandOutput;
        try {
            obj = await s3.headObject({Bucket: bucketName, Key: dd.algo_cl_ord_id});
            if (
                obj &&
                obj.Metadata &&
                (obj.Metadata["ipfs-hash"] !== "" || obj.Metadata["arweave-hash"] !== "")
            ) {
                await conn.execute(`update okx_algo set up_state = 4 where id = ${dd.id};`);
                conn.end().then();
                return;
            }
        } catch (e: any) {
            if (e.name === "NotFound" && e.$metadata.httpStatusCode === 404) {
                notFound = true;
            }
        }

        if (notFound) {
            const symbol = dd.inst_id.split("-")[0];
            let title = "平仓";
            let side = "";
            if (dd.pos_side === "long") {
                title += "🚀";
                side += "平多🚀";
            } else if (dd.pos_side === "short") {
                title += "🪂";
                side += "平空🪂";
            }

            const realizedPnl = Number(dd.realized_pnl);
            const ratio = Number(dd.pnl_ratio) * 100; //平仓收益率
            const fee = dd.fee; //累计手续费金额，正数代表平台返佣 ，负数代表平台扣除
            const fundingFee = dd.funding_fee;
            let realizedPnlTxt: string;

            if (realizedPnl > 0) {
                realizedPnlTxt = `📈${realizedPnl.toFixed(1)}(${ratio.toFixed(2)}%)`;
            } else {
                realizedPnlTxt = `📉${realizedPnl.toFixed(1)}(${ratio.toFixed(2)}%)`;
            }

            const content =
                `币种:${symbol}\n` +
                `交易方向:${side}\n` +
                `平仓均价:💲${dd.close_avg_px}\n` +
                `已实现收益:${realizedPnlTxt}\n` +
                `累计手续费金额:${fee}\n` +
                `累计资金费用:${fundingFee}\n` +
                "＿＿＿＿＿＿＿🦄️🦄️🦄＿＿＿＿＿＿＿\n" +
                "止盈止损会随后台策略实时修改❗\n" +
                // "账户初始资金:💲1200\n" +
                "仅供学习参考，不构成投资建议❗\n" +
                "在区块链上记录每一笔交易🐸";
            const avatarKey = Object.keys(IMG_SRC["avatar"])[
                Math.floor(Math.random() * Object.keys(IMG_SRC["avatar"]).length)
            ];
            const data: Types = {
                id: dd.algo_cl_ord_id,
                pid: dd.cl_ord_id,
                symbol: IMG_SRC["coin"][symbol.toLowerCase()],
                title: title,
                author: "0x11a1",
                avatar: IMG_SRC["avatar"][avatarKey],
                content: content,
                timestamp: dayjs(dd.pos_update_time).unix(),
                secretKey: "",
            };

            await s3.putObject({
                Bucket: bucketName,
                Key: dd.algo_cl_ord_id,
                Body: JSON.stringify(data),
                ContentType: "application/json",
            });
        }
    }
    conn.end().then();
};
