import {LRUCache} from "lru-cache";

const cache: LRUCache<Object, Object, unknown> = new LRUCache({max: 10000});
cache.set("key", "value");
cache.get("key"); // "value"

console.log(cache.get("key"));
