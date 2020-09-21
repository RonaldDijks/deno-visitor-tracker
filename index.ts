import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts'

const args = parse(Deno.args);
const port = Number(args.port) || 8000;

let hits = 0;

const router = new Router();

router.get('/', (ctx) => {
  console.log(hits)
  hits += 1;
  ctx.response.body = hits;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port }).then(() => {
  console.log(`Server started on port: 8000`)
});