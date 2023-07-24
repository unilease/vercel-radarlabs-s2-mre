# Vercel @radarlabs/s2 MRE

## Fixed!

1. Use `includeFiles` inside a `vercel.json` file to force include library:
   ```
   {
      "functions": {
         "api/radius.mjs": {
            "includeFiles": "node_modules/@radarlabs/s2/**"
         }
      }
   }
   ```
1. Copy over the binary generated in issue https://github.com/radarlabs/s2/issues/68 using `vercel-build` to avoid GLIBC_2.29 not found:
   ```
   cp ./s2.node ./node_modules/@radarlabs/s2/lib/binding/Release/node-v108-linux-x64/s2.node
   ```

## Original Issue

[`@radarlabs/s2`](https://github.com/radarlabs/s2) supports Node.js 16, 18 and 20, however, running it in a Vercel serverless function on Node 18 returns an error.

## Steps to reproduce:

1. Deploy this repository to Vercel using Node.js version 18.x
1. Visit `/api/radius` on the deployment preview URL
1. Go to the deployment logs and see the endpoint with the error message:
   ```
   Cannot find module '/var/task/node_modules/@radarlabs/s2/lib/binding/Release/node-v108-linux-x64/s2.node'
   Require stack:
   - /var/task/node_modules/@radarlabs/s2/index.js
   Did you forget to add it to "dependencies" in `package.json`?
   ```
1. Go to the deployment build output
1. Look for `>>> Find s2.node file <<<` and the path is found

## Expected result:

1. Change Node.js version to 16.x in Vercel project settings
1. Redeploy project
1. Visit `/api/radius` on the deployment preview URL
1. Endpoint returns json data
1. Go to the deployment build output
1. Look for `>>> Find s2.node file <<<` and the path is found in the same location
