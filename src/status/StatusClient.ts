import { GitPullRequestStatus } from "../typesTfs.ts";

const API_VERSION = "5.0-preview.1";

export class StatusClient {
    constructor(
        public readonly patToken: string,
    ) {}

    private _createUrl(projectUrl: string, repositoryId: string, pullrequestId: string | number): string {
        return `${!projectUrl.endsWith("/") ? `${projectUrl}/` : projectUrl}_apis/git/repositories/${repositoryId}/pullRequests/${pullrequestId}/statuses?api-version=${API_VERSION}`;
    }

    private _createAuthenticationHeader() {
        return {
            "Authenticate": `Basic ${btoa(`:${this.patToken}`)}`,
        };
    }

    public async postStatus(status: GitPullRequestStatus, projectUrl: string, repositoryId: string, pullrequestId: string | number): Promise<void> {
        const response = await fetch(this._createUrl(projectUrl, repositoryId, pullrequestId), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...this._createAuthenticationHeader(),
            },
            body: JSON.stringify(status),
        });

        if (!response.ok)
            throw new Error(`Failed to send new PR status: ${response.status} ${response.statusText}`);
    }
}