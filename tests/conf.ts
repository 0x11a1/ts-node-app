import dotenv from "dotenv";
import {conf, getConfig} from "@/discord/conf";

getConfig();
console.log(conf);
console.log("---------------------------------");
for (const item in conf.inOut) {
    console.log(item);
}
console.log("---------------------------------");
for (const item of conf.inOut) {
    console.log("🌱🌱🌱", Object.prototype.hasOwnProperty.call(item, "1179052513274638338"));
    console.log(item);
    console.log(Object.keys(item));
}
console.log("---------------------------------");
console.log(
    "inChannels",
    conf.inOut.flatMap((item) => Object.keys(item))
);
const outChannels = conf.inOut.flatMap((item) => Object.values(item));
console.log("values", outChannels);
console.log("outChannels", outChannels.join().split(","));
console.log("---------------------------------");
console.log("🌱inChannels🌱", conf.inChannels);
console.log("🌱outChannels🌱", conf.outChannels["1"]);
