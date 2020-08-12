# download-release-action

[![Integration status](https://github.com/hecrj/download-release-action/workflows/Integration/badge.svg)](https://github.com/hecrj/download-release-action/actions)

Downloads all the assets of a GitHub release.

# Usage
By default, the action is expected to run in a `release` event.

In a different context, you can provide values for the `release` and `output` inputs.

```yml
name: Release
on:
  release:
    types: [published]

jobs:
  distribute:
    runs-on: ubuntu-latest
    steps:
    - uses: hecrj/download-release-action@v1
    - name: List release assets
      run: ls ${{ github.event.release.tag_name }}
```

## Inputs
The following inputs can be provided with the `jobs.<job_id>.steps.with` yaml key.

| Name       | Required | Description                                                    | Default |
|------------|:--------:|----------------------------------------------------------------|---------|
| repository | ✖        | Repository name, with owner.                                   | `github.repository`             |
| release    | ✖        | The identifier of the release to download.                     | `github.event.release.id`       |
| output     | ✖        | The output directory where the assets will be downloaded.      | `github.event.release.tag_name` |
| token      | ✖        | The token used to authenticate the requests to the GitHub API. | `github.token`                  |

For more details, check out [`action.yml`].

[`action.yml`]: https://github.com/hecrj/download-release-action/blob/master/action.yml

# Contributing / Feedback
Contributions and feedback are welcome! Feel free to open any issues or pull requests.
