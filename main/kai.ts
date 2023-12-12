import {kai} from "@/_4everland/kai";

kai("feicrypto")
    .then(() => {
        console.log("✅4everland 开单上传成功");
    })
    .catch((err) => {
        console.log("📛4everland 开单上传错误", err);
    });
