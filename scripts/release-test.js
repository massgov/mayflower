const { Octokit, App } = require("octokit")
const { createAppAuth } = require('@octokit/auth-app');
require('dotenv').config();

(async function() {
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: 1,
      privateKey: process.env.DANGER_GITHUB_PRIV_KEY,
      installationId: 123,
    },
  });
  
  
  // authenticates as app based on request URLs
  const {
    data: { slug }
  } = await octokit.rest.apps.getAuthenticated();

  console.log(data)
  
  // creates an installation access token as needed
  // assumes that installationId 123 belongs to @octocat, otherwise the request will fail
  octokit.rest.issues.create({
    owner: "massgov",
    repo: "mayflower",
    title: "Hello world from " + slug,
  });
  
  // const app = new App({ appId, privateKey });
  // const { data: slug } = await app.octokit.rest.apps.getAuthenticated();
  // const octokit = await app.getInstallationOctokit(123);
  // await octokit.rest.issues.create({
  //   owner: "massgov",
  //   repo: "mayflower",
  //   title: "Hello world from " + slug,
  // });
})().catch(function(err) {
  console.error(err.toString());
  process.exit(1);
})
