import { parse } from "https://deno.land/std/flags/mod.ts";

interface RedisConfig {
  hostname: string;
  port: number;
  db?: number;
  password?: string;
  name?: string;
}

const defaultRedisConfig: RedisConfig = {
  hostname: "127.0.0.1",
  port: 6379,
};

export interface Config {
  port: number;
  redis: RedisConfig;
}

function parseRedisURL(url: string): RedisConfig {
  const parsedURL = new URL(url);
  return {
    hostname: parsedURL.hostname,
    port: Number(parsedURL.port),
    db: Number((parsedURL.pathname || "/0").substr(1)) || 0,
    password: parsedURL.password,
    name: parsedURL.username,
  };
}

export function get(): Config {
  const REDIS_URL = Deno.env.get("REDIS_URL");
  const redis = REDIS_URL ? parseRedisURL(REDIS_URL) : defaultRedisConfig;
  return {
    port: Number(Deno.env.get("PORT")) || 8000,
    redis,
  };
}
