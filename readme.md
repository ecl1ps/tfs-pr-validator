# About
**Azure DevOps PR Validator** is a web service which can validate title of a pull request in Azure DevOps Services and inform it about pull request's validity.

## Process overview
1. User creates or updates pull request.
2. Azure DevOps invokes Web Hook which sends information about pull request to  _validator app_.
3. Validator validates pull request and posts validation result through Azure DevOps REST Status API.
4. Pull request page shows status's result and may enforce positive status requirement through Branch policies.

## Install
1. install Deno: https://deno.land/#installation
2. [for development] install Denon: https://deno.land/x/denon#install
3. [VS Code extension] install extension with id: _denoland.vscode-deno_

## Bundle app (no build required)
`deno bundle src/index.ts app.bundle.js`

## Run app
`deno run --allow-net --allow-env app.bundle.js [<port>]`
or
`deno run [--cert <path to corporate CA PEM certificate>] --allow-net --allow-env app.bundle.js [<port>]` in corporate environment

## Configuration
### Azure DevOps Authentication
API access token must be set in environment variable `TFS_API_KEY`. See https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate for instructions how to create PAT. Required token scope is just **Code/Status**.

### Azure DevOps WebHook
In Azure DevOps go to _Project Settings_ and create two new _Service Hooks_ of type _Web Hook_ triggered on: _Pull request created_ and _Pull request updated_. Configure filters as per your needs. Set it to send HTTP request to: **`<validator IP or url>:<port (default is 8000)>/validate-pr/title`**.

### Azure DevOps Branch Policies
In Azure DevOps go to _Branch policy_ and add new requirement under _Require approval from additional services_ with _Status to check_ = `tfs-pr-validator/title-validation`.