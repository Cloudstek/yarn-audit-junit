# yarn-audit-junit

> [!IMPORTANT]
> Thank you for your interest! ✨ Yet this package is no longer actively maintained and is superseded
> by [node-audit-formatter](https://github.com/mdeboer/node-audit-formatter) (also by me) which has support for _way_ more
> package managers. Please go check it out!

Very simple script to convert the JSON log output of `yarn audit` to JUnit XML format. Useful for CI pipelines to report
on any vulnerabilities.

The result does not include all the original details found in the JSON output by yarn but enough for my CI purposes.

## Requirements

- NodeJS 14+
- Yarn classic (v1)

## Usage

```shell
yarn audit | npx @cloudstek/yarn-audit-junit > report.junit.xml
```
