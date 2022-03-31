#!/usr/bin/env node
import xmlbuilder2 from 'xmlbuilder2'
import {format} from "util";
import {parse} from '@jsonlines/core';
import {EOL} from 'os';

let testsuite = xmlbuilder2.create()
    .ele('testsuite', {
            package: '',
            errors: 0,
            failures: 0,
            tests: 0
        }
    );

const jsonLinesParser = parse();

process.stdin.pipe(jsonLinesParser);

jsonLinesParser.on('data', (line) => {
    if (line.type === "auditSummary") {
        const vulns = line.data.vulnerabilities;

        testsuite
            .att('failures', vulns.info + vulns.low + vulns.moderate + vulns.high + vulns.critical)
            .att('tests', line.data.totalDependencies);

        return;
    }

    if (line.type !== "auditAdvisory") {
        return;
    }

    let testcase = testsuite
        .ele('testcase', {
            name: format(
                '%s (%s - %s)',
                line.data.advisory.module_name,
                line.data.advisory.vulnerable_versions,
                line.data.advisory.severity
            ),
            classname: 'packages'
        });

    let failure = testcase.ele('failure');
    failure.txt(
        format(
            '%s - %s (%s)',
            line.data.advisory.cves.join(' '),
            line.data.advisory.title,
            line.data.advisory.url
        )
    );
});

jsonLinesParser.on('end', () => {
    process.stdout.write(testsuite.up().end({prettyPrint: true}) + EOL)
});
