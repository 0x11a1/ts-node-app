import dotenv from "dotenv";
dotenv.config();

const host = process.env.TS_NODE_MYSQL_HOST;
const user = process.env.TS_NODE_MYSQL_USER;
const password = process.env.TS_NODE_MYSQL_PASSWORD;
const database = process.env.TS_NODE_MYSQL_DATABASE;

export const config = {
    host,
    user,
    password,
    database,
};
