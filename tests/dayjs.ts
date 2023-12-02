import dayjs from "dayjs";

console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
console.log(dayjs().unix());
console.log("nodejs_" + dayjs().unix());
