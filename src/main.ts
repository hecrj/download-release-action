import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as path from 'path';

async function run() {
  try {
    const repository = core.getInput('repository');
    const components = core.getInput('release');
    const token = core.getInput('token');

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
