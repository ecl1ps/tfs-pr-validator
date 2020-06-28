export function getProjectUrl(repositoryUrl: string): string {
    const endIndex = repositoryUrl.indexOf("_git/");
    return endIndex > 0 ? repositoryUrl.substr(0, endIndex - 1) : repositoryUrl;
}