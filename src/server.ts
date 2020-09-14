import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";

export async function runServer(port: number, controller: (request: ServerRequest) => Promise<void>) {
    const s = serve({ port });
    console.log(`http://localhost:${port}/`);
    
    for await (const req of s) {
        await controller(req);
    }
}
