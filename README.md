# Unable to perform successful deploys just after upgrading SST version

## Context

- This is a repo with the minimal reproduction to the [reported issue](https://github.com/sst/sst/issues/4989).
- The folder structure is the way it is because it imitates my private repo which has been migrated from using CDK to SST, so the monorepo structure hasn't been implemented (mostly because is a large repo and it worked without issues).

## Requirements to reproduce the issue

- Having both node.js and docker installed in the OS.
- Install dependencies in `sst` and `lambda` directories.

## How to reproduce the issue?

First make sure for the initial deploy you are using the SST version: `3.1.29`, then execute:

1. `cd sst`
2. `pnpm sst deploy --stage dev`
3. Wait a few minutes and you'll see the deploy is successful, the lambda's code and the Fargate are deployed correctly. If you publish an event from the SNS topic, you'll also see the lambda execution is correct.
4. `pnpm sst upgrade`
5. `pnpm sst deploy --stage dev`
6. Wait a few minutes and you'll see the deploy is successful in your terminal, but if you check the AWS console you'll notice:

   - The lambda's code was not deployed.
   - If you publish another event from the SNS topic you'll get an execution error.
   - After 10 minutes you'll see the last deploy in the Fargate console was not successful, it's triggering a new deploy or a rollback, the load balancer target group can't be described and the service is down indefinitely.

Also you can use the new SNS `subscribe` syntax and use the new `loadBalancer` prop in the service config but these issues remains.
