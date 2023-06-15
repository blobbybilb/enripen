import { Hono } from "https://deno.land/x/hono@v3.2.3/mod.ts"
import { WhyDoc } from "https://deno.land/x/whydoc@rel1/doc.ts"
import { saveLink } from "../../core/data.ts"

const app = new Hono()
const doc = WhyDoc({
  title: "Enripen API Docs",
  basePath: "/api",
})

app.post(
  doc("/find", "", {
    postParams: {
      URL: "string",
    },
  }),
  (c) => c.text(c.req.url),
)

app.post(
  doc("/save", "", {
    postParams: {
      oldURL: "string",
      newURL: "string",
    },
  }),
  (c) => saveLink(c.req),
)

export const handler = app.fetch
