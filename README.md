# WebdriverIO Test Automation Framework

Test automation framework built with [WebdriverIO](https://webdriver.io/), using Mocha as the test framework, Chrome as the target browser, and dual reporting (console + HTML) for test results.

## Tech Stack

- **Test Runner:** WebdriverIO (local runner)
- **Framework:** Mocha (BDD style)
- **Browser:** Chrome
- **Reporters:**
  - `spec` — real-time console output
  - `wdio-html-nice-reporter` — rich HTML report with an aggregated master report

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
```

To run the tests:

```bash
npm run wdio
```

### Console Output

The `spec` reporter prints live results directly to the terminal, including:
- Pass/fail status per test
- Execution time
- Error stack traces on failure

### HTML Report

After the run completes, an aggregated HTML report is generated at:

```
reports/html-reports/master-report.html
```

Open it in any browser to view a detailed, navigable summary of the test run, including screenshots (if enabled).
