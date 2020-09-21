import { connect } from "https://deno.land/x/redis@v0.13.0/mod.ts";
import * as Config from './config.ts'

const config = Config.get();

const redis = await connect({
  hostname: config.redis.hostname,
  port: config.redis.port,
  name: config.redis.name,
  password: config.redis.password,
  db: config.redis.db
});

const TOTAL_VISITS_KEY = "TOTAL_VISITS";
const UNIQUE_VISITS_KEY = "UNIQUE_VISITS";

async function getTotalVisits() {
  return (await redis.get(TOTAL_VISITS_KEY)) || 0;
}

async function increaseTotalVisits() {
  await redis.incr(TOTAL_VISITS_KEY);
}

async function getUniqueVisits() {
  return (await redis.get(UNIQUE_VISITS_KEY)) || 0;
}

async function increaseUniqueVisits(ip: string) {
  const exists = await redis.exists(ip) != 0;
  console.log(exists)
  if (!exists) {
    await redis.set(ip, "1");
    await redis.incr(UNIQUE_VISITS_KEY);
  }
}

export async function increase(ip: string) {
  await increaseTotalVisits();
  await increaseUniqueVisits(ip);
}

interface GetReponse {
  total: number,
  unique: number
}

export async function get(): Promise<GetReponse> {
  return {
    total: await getTotalVisits() as number,
    unique: await getUniqueVisits() as number
  }
}
