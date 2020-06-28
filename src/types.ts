import { GitPullRequest, GitStatus } from "./typesTfs.ts";

export type Validator = (pullreques: GitPullRequest) => GitStatus;