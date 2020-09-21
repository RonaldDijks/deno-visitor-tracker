import { Application } from "https://deno.land/x/oak/mod.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts'

const args = parse(Deno.args);
const port = Number(args.port) || 8000;

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port }).then(() => {
  console.log(`Server started on port: 8000`)
});