# React App "Scaffold"

## Development workflow
You must create you ticket branches off the NCIOCPL repo such that secrets are used. Github actions cannot handle forked repos and secrets yet.

## Steps to Create a new React App Repo
1. Create an empty repository from NCIOCPL
1. Download a copy of this repository (detatched from git)
1. Run `npm ci`
2. Make changes to the following files:
   * `config/webpack.config.js` - change:
     - `library: 'nci-cgov-react-app-playground',` to be
     - `library: 'nci-REPO_NAME_HERE',` where the library name looks something like `nci-sitewide-search-app`
   * `cypress/integration/common/beforeEach.js` - modify this object to include the defaults for integration tests that should be passed to initialize.
   * `public/index.html` - Update the `const cfgs = [...]` block to set the initialize options for the apps. Modify `<select id="jm1" class="jumpmenu">` to set the dropdown name for the configuration.
	 * Modify `package.json` to set the `name`, `version`, `repository.url`, `bugs.url` to this repos values.
	   * Run `` to update the lock.
1. Go to the NCIOCPL Organization Secrets and add permissions to the  new repository for these secrets:
   * ...

## Folder Structure
* <REPO_ROOT>
  * `.github/workflows/workflow.yml` - this is the CI pipeline for the app. Any pushes, PRs will build, test and deploy to react-app-dev. This requires a set of secrets.
  * `config` - this is the webpack configuration files
  * `cypress` - main integration testing folder. Ususes cypress-cucumber-processor library.
    * `integration` - this is where features and step definitions go.
      * `AppAnalytics/SampleAnalyticsTest.feature` - This feature tests a page load and a button click.
      * `common`
        * `analytics.js` - Steps to test Event-driven Datalayer (EDDL) based analytics.
        * `beforeEach.js` - Sets up application defaults on `window.INT_TEST_APP_PARAMS`, which are then overridden using the `{string} is set to {string}` step. This object must be customized to your application.
        * `index.js` - various common steps for navigation and such.
        * `MetaTags.js` - common steps for metadata inspection.
      * `SamplePageTest.feature` - sample feature file for the test page.
    * `plugins` - Cypress scaffolding. Also includes helpers to deal with code coverage.
    * `support` - Cypress scaffolding.
  * `public` - This is the folder containg the web site static content and used for local dev, integration testing, and react-app-dev testing. This is NOT used for production.
    * `fonts` - Cgov fonts
    * `__nci-dev__common.css` - a copy of cancer.gov'
    s common CSS.
    * `index.css` - css to support the application configuration switcher.
    * `index.html` - Html file to contain the www.cancer.gov C-clamp, and application configuration switcher.
    * other OOB CRA items like robots.txt.
  * `scripts` - scripts from CRA that have been heavily modified to meet the needs for our stack.
    * `build.js` -
    * `start.js` -
    * `test.js` -
  * `src`
	* `support` - this contains the code for mocking APIs, as well as the mock data
	  * `mock-data` - This the folder structure under here should match the paths for `setupProxy.js`.
	  * `src/setupProxy.js` - This is the place where you will mock all the API calls.
	* `.editorconfig` - editorrc file to help ensure saved files are consisten with linter.
	* `.eslintrc.js` - The linter config. These are based off of AirBnB react rules that @arcepaul modified.
	* `.gitignore` - gitignore file based on CRA, with additions for our stack. (e.g. ignore cypress screenshots)
	* `.prettierrc` - similar to editorconfig. help with linter rules.
	* `jest-test-setup` - ??
	* `package.json` and `package-lock.json` - you should know what these are.
	* `README.md` - this document
