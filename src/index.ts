import { runServer } from "./server.ts";
import { controller } from "./controller.ts";
import { StatusClient } from "./status/StatusClient.ts";

const apiToken = "";
const statusClient = new StatusClient(apiToken);
runServer((request) => controller(request, statusClient));