import { Validator } from "../types.ts";
import { GitPullRequest, GitStatus, GitStatusState } from "../typesTfs.ts";

const context = {
    name: "title-validation",
    genre: "tfs-pr-validator",
};

const VALIDATION_REGEX = /^(\d+|TEST) - [A-ZÁČĎÉÍŇÓŘŠŤÚŽ\d].*/;

export const pullrequestTitleValidator: Validator = (pullrequest: GitPullRequest): GitStatus => {
    const title = pullrequest.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (VALIDATION_REGEX.test(title)) {
        return {
            state: GitStatusState.succeeded,
            description: "Title is in correct format",
            context,
        };
    }

    return {
        state: GitStatusState.error,
        description: "Title must follow format '12345 - Description of the change' or 'TEST - Description of the change'",
        context,
    };
};