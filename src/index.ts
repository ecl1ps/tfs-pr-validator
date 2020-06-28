import { runServer } from "./server.ts";
import { controller } from "./controller.ts";
import { StatusClient } from "./status/StatusClient.ts";

const TFS_API_ENV_KEY = "TFS_API_KEY";

const apiToken = Deno.env.get(TFS_API_ENV_KEY);
if (!apiToken)
    throw new Error(`TFS API access token must be set in environment variable ${TFS_API_ENV_KEY}. See https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate for instructions.`);

const statusClient = new StatusClient(apiToken);
runServer((request) => controller(request, statusClient));