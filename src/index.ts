import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import Random from 'https://deno.land/x/random@v1.1.2/Random.js'

import * as Config from './config.ts'
import * as Visits from './visits.ts'
import * as Image from './image.ts'

const config = Config.get();
const router = new Router();

const random = new Random();

router.get('/', async (ctx) => {
  await Visits.increase(ctx.request.ip);
  const visits = await Visits.get();
  ctx.response.body = visits;
});

router.get('/image', async (ctx) => {
  const image = Image.createImage(123456789, 123456789);
  ctx.response.headers.set('Content-Type', 'image/png');
  ctx.response.body = image;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: config.port }).then(() => {
  console.log(`Server started on port: 8000`)
});