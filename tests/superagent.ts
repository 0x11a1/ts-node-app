import superagent from "superagent";
import {SocksProxyAgent} from "socks-proxy-agent";

console.log("superagent basic");

const agent = new SocksProxyAgent("socks://127.0.0.1:7890");
superagent
    .get("https://arweave.net/bsMsYyZlCGSZXHuwZ4BReNk1t-xFcg7KYAPHvXBx5jA")
    .agent(agent)
    .end((err, res) => {
        console.log(res.body);
    });
