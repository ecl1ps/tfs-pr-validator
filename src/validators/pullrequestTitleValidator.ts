import { Validator } from "../types.ts";
import { GitPullRequest, GitStatus, GitStatusState } from "../typesTfs.ts";

export const pullrequestTitleValidator: Validator = (pullrequest: GitPullRequest): GitStatus => {
    return {
        state: GitStatusState.pending,
        description: pullrequest.title,
        context: {
            name: "x",
            genre: "y",
        }
    };
};