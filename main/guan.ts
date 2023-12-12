import {guan} from "@/_4everland/guan";

guan("feicrypto")
    .then(() => {
        console.log("✅4everland 关单上传成功");
    })
    .catch((err) => {
        console.log("📛4everland 关单上传错误", err);
    });
