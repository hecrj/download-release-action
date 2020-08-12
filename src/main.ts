import * as path from 'path';
import * as stream from 'stream';
import * as fs from 'fs';
import * as core from '@actions/core';
import * as io from '@actions/io';
import got from 'got';
import { Octokit } from '@octokit/rest';
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

async function run() {
  try {
    const repository = core.getInput('repository');
    const release_id = core.getInput('release');
    const token = core.getInput('token');
    let output = core.getInput('output');

    const octokit = new Octokit({
      auth: token,
    });

    const owner_repository = repository.split('/');


    const assets = await octokit.repos.listReleaseAssets({
      owner: owner_repository[0],
      repo: owner_repository[1],
      release_id: +release_id,
    });

    if(output === '') {
      const release = await octokit.repos.getRelease({
        owner: owner_repository[0],
        repo: owner_repository[1],
        release_id: +release_id ,
      });

      output = release.data.tag_name;
    }

    io.mkdirP(output);

    for (let asset of assets.data) {
      pipeline(
        got.stream(
          `https://api.github.com/repos/${repository}/releases/assets/${asset.id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/octet-stream",
              Authorization: `token ${token}`,
              "User-Agent": "",
            },
          }
        ),
        fs.createWriteStream(`${output}/${asset.name}`)
      );
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
