import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

function handler(request: Request) {
  let str = "";
  for (const [key, value] of request.headers.entries()) {
    str += `${key}: ${value}\n`;
  }
  return new Response(`Your IP is: ${str}`);
}

serve(handler);
