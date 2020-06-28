/**
 * Represents all the data associated with a pull request.
 */
export interface GitPullRequest {
    /**
     * Links to other related objects.
     */
    //_links: any;
    /**
     * A string which uniquely identifies this pull request. To generate an artifact ID for a pull request, use this template: ```vstfs:///Git/PullRequestId/{projectId}/{repositoryId}/{pullRequestId}```
     */
    artifactId: string;
    /**
     * If set, auto-complete is enabled for this pull request and this is the identity that enabled it.
     */
    //autoCompleteSetBy: VSS_Common_Contracts.IdentityRef;
    /**
     * The user who closed the pull request.
     */
    //closedBy: VSS_Common_Contracts.IdentityRef;
    /**
     * The date when the pull request was closed (completed, abandoned, or merged externally).
     */
    closedDate: Date;
    /**
     * The code review ID of the pull request. Used internally.
     */
    codeReviewId: number;
    /**
     * The commits contained in the pull request.
     */
    //commits: GitCommitRef[];
    /**
     * Options which affect how the pull request will be merged when it is completed.
     */
    //completionOptions: GitPullRequestCompletionOptions;
    /**
     * The most recent date at which the pull request entered the queue to be completed. Used internally.
     */
    completionQueueTime: Date;
    /**
     * The identity of the user who created the pull request.
     */
    //createdBy: VSS_Common_Contracts.IdentityRef;
    /**
     * The date when the pull request was created.
     */
    creationDate: Date;
    /**
     * The description of the pull request.
     */
    description: string;
    /**
     * If this is a PR from a fork this will contain information about its source.
     */
    //forkSource: GitForkRef;
    /**
     * Draft / WIP pull request.
     */
    isDraft: boolean;
    /**
     * The labels associated with the pull request.
     */
    labels: unknown;//TFS_Core_Contracts.WebApiTagDefinition[];
    /**
     * The commit of the most recent pull request merge. If empty, the most recent merge is in progress or was unsuccessful.
     */
    //lastMergeCommit: GitCommitRef;
    /**
     * The commit at the head of the source branch at the time of the last pull request merge.
     */
    //lastMergeSourceCommit: GitCommitRef;
    /**
     * The commit at the head of the target branch at the time of the last pull request merge.
     */
    //lastMergeTargetCommit: GitCommitRef;
    /**
     * If set, pull request merge failed for this reason.
     */
    mergeFailureMessage: string;
    /**
     * The type of failure (if any) of the pull request merge.
     */
    //mergeFailureType: PullRequestMergeFailureType;
    /**
     * The ID of the job used to run the pull request merge. Used internally.
     */
    mergeId: string;
    /**
     * Options used when the pull request merge runs. These are separate from completion options since completion happens only once and a new merge will run every time the source branch of the pull request changes.
     */
    //mergeOptions: GitPullRequestMergeOptions;
    /**
     * The current status of the pull request merge.
     */
    //mergeStatus: PullRequestAsyncStatus;
    /**
     * The ID of the pull request.
     */
    pullRequestId: number;
    /**
     * Used internally.
     */
    remoteUrl: string;
    /**
     * The repository containing the target branch of the pull request.
     */
    repository: GitRepository;
    /**
     * A list of reviewers on the pull request along with the state of their votes.
     */
    //reviewers: IdentityRefWithVote[];
    /**
     * The name of the source branch of the pull request.
     */
    sourceRefName: string;
    /**
     * The status of the pull request.
     */
    status: PullRequestStatus;
    /**
     * If true, this pull request supports multiple iterations. Iteration support means individual pushes to the source branch of the pull request can be reviewed and comments left in one iteration will be tracked across future iterations.
     */
    supportsIterations: boolean;
    /**
     * The name of the target branch of the pull request.
     */
    targetRefName: string;
    /**
     * The title of the pull request.
     */
    title: string;
    /**
     * Used internally.
     */
    url: string;
    /**
     * Any work item references associated with this pull request.
     */
    //workItemRefs: VSS_Common_Contracts.ResourceRef[];
}

export interface GitRepository {
    //_links: any;
    defaultBranch: string;
    id: string;
    /**
     * True if the repository was created as a fork
     */
    isFork: boolean;
    name: string;
    //parentRepository: GitRepositoryRef;
    project: TeamProjectReference;
    remoteUrl: string;
    /**
     * Compressed size (bytes) of the repository.
     */
    size: number;
    sshUrl: string;
    url: string;
    validRemoteUrls: string[];
}

/**
 * Represents a shallow reference to a TeamProject.
 */
export interface TeamProjectReference {
    /**
     * Project abbreviation.
     */
    abbreviation: string;
    /**
     * The project's description (if any).
     */
    description: string;
    /**
     * Project identifier.
     */
    id: string;
    /**
     * Project name.
     */
    name: string;
    /**
     * Project revision.
     */
    revision: number;
    /**
     * Project state.
     */
    state: any;
    /**
     * Url to the full version of the object.
     */
    url: string;
    /**
     * Project visibility.
     */
    //visibility: ProjectVisibility;
}

/**
 * Status of a pull request.
 */
export enum PullRequestStatus {
    /**
     * Status not set. Default state.
     */
    NotSet = 0,
    /**
     * Pull request is active.
     */
    Active = 1,
    /**
     * Pull request is abandoned.
     */
    Abandoned = 2,
    /**
     * Pull request is completed.
     */
    Completed = 3,
    /**
     * Used in pull request search criterias to include all statuses.
     */
    All = 4
}

/**
 * This class contains the metadata of a service/extension posting a status.
 */
export interface GitStatus {
    /**
     * Context of the status.
     */
    context: GitStatusContext;
    /**
     * Identity that created the status.
     */
    //createdBy: VSS_Common_Contracts.IdentityRef;
    /**
     * Creation date and time of the status.
     */
    creationDate?: Date;
    /**
     * Status description. Typically describes current state of the status.
     */
    description: string;
    /**
     * Status identifier.
     */
    id?: number;
    /**
     * State of the status.
     */
    state: GitStatusState;
    /**
     * URL with status details.
     */
    targetUrl?: string;
    /**
     * Last update date and time of the status.
     */
    updatedDate?: Date;
}
/**
 * Status context that uniquely identifies the status.
 */
export interface GitStatusContext {
    /**
     * Genre of the status. Typically name of the service/tool generating the status, can be empty.
     */
    genre?: string;
    /**
     * Name identifier of the status, cannot be null or empty.
     */
    name: string;
}
/**
 * State of the status.
 */
export enum GitStatusState {
    /**
     * Status state not set. Default state.
     */
    notSet = "notSet",
    /**
     * Status pending.
     */
    pending = "pending",
    /**
     * Status succeeded.
     */
    succeeded = "succeeded",
    /**
     * Status failed.
     */
    failed = "failed",
    /**
     * Status with an error.
     */
    error = "error",
    /**
     * Status is not applicable to the target object.
     */
    notApplicable = "notApplicable",
}

/**
 * This class contains the metadata of a service/extension posting pull request status. Status can be associated with a pull request or an iteration.
 */
export interface GitPullRequestStatus extends GitStatus {
    /**
     * ID of the iteration to associate status with. Minimum value is 1.
     */
    iterationId?: number;
    /**
     * Custom properties of the status.
     */
    properties?: any;
}