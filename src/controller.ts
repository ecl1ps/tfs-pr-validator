import { ServerRequest } from "https://deno.land/std/http/server.ts";

export const controller = async (req: ServerRequest) => {
    await req.respond({ body: "Hello World\n" });
};