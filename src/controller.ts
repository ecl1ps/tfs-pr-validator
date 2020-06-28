import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { pullrequestTitleValidator } from "./validators/pullrequestTitleValidator.ts";
import { StatusClient } from "./status/StatusClient.ts";
import { Validator } from "./types.ts";
import { GitPullRequest, GitPullRequestChange } from "./typesTfs.ts";
import { getProjectUrl } from "./tfsUtils.ts";

const ROUTE = "/validate-pr";
const ROUTE_PR_TITLE = `${ROUTE}/title`;

const VALIDATORS: { [key: string]: Validator} = {
    [ROUTE_PR_TITLE]: pullrequestTitleValidator,
}

export const controller = async (req: ServerRequest, statusClient: StatusClient): Promise<void> => {
    console.log("Processing request:", req.url);

    if (!req.url.startsWith(ROUTE))  {
        req.respond({ status: 404, body: "Unknown request" });
        return;
    }

    if (req.method !== "POST" || !req.body) {
        await req.respond({ status: 400, body: "Validation occurs only on POST requests with body" });
        return;
    }

    let pullrequestChange: GitPullRequestChange;
    try {
        pullrequestChange = JSON.parse(new TextDecoder().decode(await Deno.readAll(req.body)));
    } catch (e) {
        await req.respond({ status: 500, body: "Unable to parse json body" });
        return;
    }
    
    console.log("Processing message:", pullrequestChange.message.text);

    const pullrequest: GitPullRequest = pullrequestChange.resource;

    const validator = VALIDATORS[req.url];
    if (!validator) {
        await req.respond({ status: 404, body: "There is no know validation rule for requested url" });
        return;
    }

    await req.respond({ body: "Ok" });

    const newStatus = validator(pullrequest);

    await statusClient.postStatus(newStatus, getProjectUrl(pullrequest.repository.remoteUrl), pullrequest.repository.id, pullrequest.pullRequestId);
};