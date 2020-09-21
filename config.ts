import { parse } from "https://deno.land/std/flags/mod.ts";

export interface Config {
  port: number;
  redis: {
    hostname: string;
    port: number;
    name?: string;
    password?: string;
  };
}

export function get(): Config {
  const args = parse(Deno.args);
  return {
    port: Number(args.port) || 8000,
    redis: {
      hostname: args.REDIS_HOSTNAME || "127.0.0.1",
      port: Number(args.REDIS_PORT) || 6379,
      name: args.REDIS_NAME || undefined,
      password: args.REDIS_PASSWORD || undefined,
    },
  };
}
