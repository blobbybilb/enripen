import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts";
import { WhyDoc } from "https://deno.land/x/whydoc@rel1/doc.ts";

const app = new Hono();
const doc = WhyDoc({
  title: "API inside fresh",
  basePath: "/api",
});

app.get(doc("/"), (c) => c.text(c.req.url));

export const handler = app.fetch;
