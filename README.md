# Enripen
A crowdsourced index to help against link rot. Crowd needed.

[Web UI](https://enripen.deno.dev/) using Fresh
[API](https://enripen.deno.dev/api) using Hono embedded in a Fresh route
[API Doc](https://enripen.deno.dev/api/docs)

<img width="200" alt="Screenshot 2023-06-15 at 11 36 24 AM" src="https://github.com/denoland/deno-kv-hackathon/assets/58201828/b5893be4-8a4c-4c59-861c-bf662e01b07c">

<img width="200" alt="Screenshot 2023-06-15 at 11 45 17 AM" src="https://github.com/denoland/deno-kv-hackathon/assets/58201828/35276ad7-5e0b-4279-b688-e418a974efad">

<img width="200" alt="Screenshot 2023-06-15 at 11 48 40 AM" src="https://github.com/denoland/deno-kv-hackathon/assets/58201828/88c31e38-2f1b-4f6e-a198-7c30c10a38a1">


## How it works/will work
There will be a browser extension that uses the API to automatically suggest redirects when you encounter a broken link. A user would also be able to submit new destination links for a broken link, and upvote links submitted by others that work.

---

Uses the Fresh framework, with Flowbite components, and Hono (embedded inside a Fresh route) for the API.

GPLv3 License, all open source libraries used have their own licenses.

The Demo UI is pretty basic because I was going to make a browser extension that uses the API but ran out of time 😅. I'll make the browser extension at some point...

Not sure what "All code must be created during the event" means exactly, but I did use some open source libraries (fresh, flowbite, and hono). If that disqualifies it then I have no problem :)
