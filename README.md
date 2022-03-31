# yarn-audit-junit

Very simple script to convert the JSON log output of `yarn audit` to JUnit XML format. Useful for CI pipelines to report
on any vulnerabilities.

The result does not include all the original details found in the JSON output by yarn but enough for my CI purposes.

## Requirements

- NodeJS 14+

## Installation

```shell
# Local
$ yarn add @cloudstek/yarn-audit-junit --dev
# Global
$ yarn global add @cloudstek/yarn-audit-junit
```

## Usage

```shell
# Local
$ yarn audit | ./node_modules/.bin/yarn-audit-junit
# Global
$ yarn audit | yarn-audit-junit
```
