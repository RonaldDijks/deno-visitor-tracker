import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import * as Config from "./config.ts";
import * as Visits from "./visits.ts";
import * as Image from "./image.ts";

const config = Config.get();
const router = new Router();

router.get("/", async (ctx) => {
  await Visits.increase(ctx.request.ip);
  const { total, unique } = await Visits.get();
  const image = Image.drawImage(total, unique);
  ctx.response.headers.set("Content-Type", "image/png");
  ctx.response.body = image;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: config.port }).then(() => {
  console.log(`Server started on port: 8000`);
});
