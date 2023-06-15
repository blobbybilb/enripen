import { kv } from "./kv.js"
import { type SavedLinkInfo } from "./types.ts"

// ["link", "example.com", "path", "to", "page.html"] : SavedLinkInfo[]

function formatLink(url: string): string[] {
  if (!url.startsWith("http")) url = "http://" + url

  const urlType = new URL(url)

  return [
    urlType.hostname,
    ...urlType.pathname.split("/").filter((x) =>
      !(x === "" || x === "index.html")
    ),
  ]
} // example.com/path/to/page.html -> ["example.com", "path", "to", "page.html"]

export async function getSavedLink(
  url: string[] | string,
): Promise<SavedLinkInfo[]> {
  if (typeof url === "string") {
    url = formatLink(url)
  }

  return (await kv.get(["links", ...url])).value
}

function isInSavedLinkList(
  newURL: string,
  oldURL: string,
  linkList: SavedLinkInfo[],
): SavedLinkInfo | false {
  for (const link of linkList) {
    if (link.linkTo === newURL && link.linkFrom === oldURL) {
      return link
    }
  }
  return false
}

export async function saveLink(
  oldURL: string,
  newURL: string,
  submitterIP: string,
) {
  const oldUrlItems = await getSavedLink(formatLink(oldURL))
  if (oldUrlItems) {
    const newUrlItem = isInSavedLinkList(newURL, oldURL, oldUrlItems)
    if (newUrlItem) {
      if (newUrlItem.submitterIPs.includes(submitterIP)) return
      newUrlItem.submitterIPs.push(submitterIP)
      return kv.set(["links", oldURL], oldUrlItems)
    }
    oldUrlItems.push({
      linkFrom: oldURL,
      linkTo: newURL,
      createdAt: new Date(),
      submitterIPs: [submitterIP],
    })
    return kv.set(["links", oldURL], oldUrlItems)
  }

  const info: SavedLinkInfo = {
    linkFrom: oldURL,
    linkTo: newURL,
    createdAt: new Date(),
    submitterIPs: [submitterIP],
  }
  return kv.set(["links", oldURL], [info])
}

// testing

await saveLink("example.com", "example2.com", "192.168.0.1")
await saveLink("examplwe.com", "example1232.com", "192.168.0.1")
await saveLink("example.com", "example1232.com", "192.16.0.1")
await saveLink("example.com", "example1232.com", "192.16.0.1")
await saveLink("example.com", "example1232.com", "192.168.0.1")
await saveLink("example.com", "example1232.com", "192.1688.0.1")
const savedLinks = await getSavedLink("examplwe.com")

console.log(3, savedLinks)

const iter = await kv.list({ prefix: ["links"] })
const users = []
for await (const res of iter) users.push(res)

for (const user of users) {
  await kv.delete(user.key)
}
