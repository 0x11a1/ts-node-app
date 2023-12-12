import {IMG_SRC} from "@/consts";

console.log(IMG_SRC["dev"]["nodejs"]);
console.log(Object.values(IMG_SRC["像素美食"]));
console.log("----------------------------------------");
const k = Object.keys(IMG_SRC["avatar"])[
    Math.floor(Math.random() * Object.keys(IMG_SRC["avatar"]).length)
];
console.log(IMG_SRC["avatar"][k]);
