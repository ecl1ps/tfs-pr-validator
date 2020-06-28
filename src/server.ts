import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";

export async function runServer(controller: (request: ServerRequest) => void) {
    const s = serve({ port: 8000 });
    console.log("http://localhost:8000/");
    
    for await (const req of s) {
        controller(req);
    }
}
