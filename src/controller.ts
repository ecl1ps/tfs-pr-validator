import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { pullrequestTitleValidator } from "./validators/pullrequestTitleValidator.ts";
import { StatusClient } from "./status/StatusClient.ts";
import { Validator } from "./types.ts";
import { GitPullRequest } from "./typesTfs.ts";

const ROUTE = "/validate-pr";
const ROUTE_PR_TITLE = `${ROUTE}/title`;

const VALIDATORS: { [key: string]: Validator} = {
    ROUTE_PR_TITLE: pullrequestTitleValidator,
}

export const controller = async ({ url, body, method, respond }: ServerRequest, statusClient: StatusClient) => {
    if (!url.startsWith(ROUTE))  {
        await respond({ status: 404, body: "Unknown request" });
        return;
    }

    if (method !== "POST" || !body) {
        await respond({ status: 400, body: "Validation occurs only on POST requests with body" });
        return;
    }

    let pullrequest: GitPullRequest;
    try {
        pullrequest = JSON.parse(new TextDecoder().decode(await Deno.readAll(body)));
    } catch (e) {
        await respond({ status: 500, body: "Unable to parse json body" });
        return;
    }

    const validator = VALIDATORS[url];
    if (!validator) {
        await respond({ status: 404, body: "There is no know validation rule for requested url" });
        return;
    }

    await respond({ body: "Ok" });

    const newStatus = validator(pullrequest);

    await statusClient.postStatus(newStatus, pullrequest.repository.project.url, pullrequest.repository.id, pullrequest.pullRequestId);
};