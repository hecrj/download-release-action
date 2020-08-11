import * as core from '@actions/core';
import * as path from 'path';
import { Octokit } from '@octokit/rest';

async function run() {
  try {
    const repository = core.getInput('repository');
    const release = core.getInput('release');
    const token = core.getInput('token');

    const octokit = new Octokit({
      auth: token,
    });

    const owner_repository = repository.split('/');

    const assets = await octokit.repos.listReleaseAssets({
      owner: owner_repository[0],
      repo: owner_repository[1],
      release_id: +release,
    });

    core.info(JSON.stringify(assets));

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
