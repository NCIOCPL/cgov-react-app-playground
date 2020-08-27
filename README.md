# React App "Scaffold"

## Development workflow
You must create you ticket branches off the NCIOCPL repo such that secrets are used. Github actions cannot handle forked repos and secrets yet.

## Steps to Create a new React App Repo
1. Create an empty repository from NCIOCPL
2. Download a copy of this repository (detatched from git)
3. Run `npm ci`
4. Make changes to the following files:
   * `config/webpack.config.js` - change:
     - `library: 'nci-cgov-react-app-playground',` to be
     - `library: 'nci-REPO_NAME_HERE',` where the library name looks something like `nci-sitewide-search-app`
   * `cypress/integration/common/beforeEach.js` - modify this object to include the defaults for integration tests that should be passed to initialize.
   * `public/index.html` - Update the `const cfgs = [...]` block to set the initialize options for the apps. Modify `<select id="jm1" class="jumpmenu">` to set the dropdown name for the configuration.
	 * Modify `package.json` to set the `name`, `version`, `repository.url`, `bugs.url` to this repos values.
	   * Run `` to update the lock.
	 * modify the `appPaths` constant in `src/hooks/routing` to setup all the routes for your app. See [Routing](#routing).
5. Remove any components from `src/components/atomic` and `src/components/molecules` that are not needed. (For example if you don't have videos, remove the youtube-video-player)
6. Go to the NCIOCPL Organization Secrets and add permissions to the  new repository for these secrets:
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
  * `src` - the source
    * `index.js` - the initialization function that creates the app state. This is the entry point to the app.
    * `App.js` - The main wrapper for the application
    * `constants.js` - please add any constants your app will use to this file
    * `hooks` - the location where all hooks should go
      * `customFetch.js` - this hook acts as a wrapper for `useQuery` hook for the external fetch library [react-fetching-library](https://marcin-piela.github.io/react-fetching-library/#/?id=usequery)
      * `routing.js` - this hook contains the methods for generating urls for the app.
      * `useURLQuery.js` - this hook uses react-router-dom's useLocation hook in conjunction with URLSearchParams to provide the application with a consistent way to access url query strings
	* `services` - contains source code for related external services
	  * `api` - contains api fetch call related items
	    * `actions` - this would contain files with fetch actions that can be invoked to make api calls with whatever parameters are required to fulfill that fetch call
	    * `axios-client.js` - Wrapper for [react-fetching-library](https://marcin-piela.github.io/react-fetching-library/#/)
	    * `buildAxiosRequest.js` - Custom axios library wrapper to build requests and handle response transformations
	    * `endpoints.js` - external api endpoints are set and defined here
	* `support` - this contains the code for mocking APIs, as well as the mock data
	  * `mock-data` - This the folder structure under here should match the paths for `setupProxy.js`.
	  * `src/setupProxy.js` - This is the place where you will mock all the API calls.
	* `.editorconfig` - editorrc file to help ensure saved files are consistent with linter.
	* `.eslintrc.js` - The linter config. These are based off of AirBnB react rules that @arcepaul modified.
	* `.gitignore` - gitignore file based on CRA, with additions for our stack. (e.g. ignore cypress screenshots)
	* `.prettierrc` - similar to editorconfig. help with linter rules.
	* `jest-test-setup` - for jest configuration you want defined before running each test
	* `package.json` and `package-lock.json` - you should know what these are.
	* `README.md` - this document

## Analytics for the NCI Event-Driven Data Layer (EDDL)
Handling analytics requires that the following code be used for a page load event:
```
window.NCIDataLayer = window.NCIDataLayer || [];
window.NCIDataLayer.push({
  type: 'PageLoad',
  event: '<EVENT_NAME>',
  page: {
    name: "",
    title: "",
    metaTitle: "",
    language: "",
    type: "",
    audience: "",
    channel: "",
    contentGroup: "",
    publishedDate: Date
    additionalDetails: {}
  }
});
```

and the following for click events:
```
window.NCIDataLayer.push({
  type: 'Other',
  event: '<EVENT_NAME>',
  data: {

  }
})
```

One of the MOST IMPORTANT things is that page load events ALWAYS preceed click events. The EDDL keeps track of the page information raised during a page load, and that information is pushed out to the Analytics Tool with the click/other data payload. So if a click event is raised by the app BEFORE the page load it is associated with, then bad things happen...

### How the react-tracker Package Works
The [react-tracking library](https://github.com/nytimes/react-tracking) offers a way for embedding analytics agnostic event tracking in a react app. React-tracker OOB allows you to set various contextual data points in each of your components, such that if a nested component raises a tracking event, those data points are included in the data payload.

For example say you are displaying a search results page. You can:
* From the view component for the search results, you `track({ pageName: 'Results Page', searchTerm: 'chicken'})`
* From the results listing component you `track({numResults: 322})`
* Then on a specific result component on a click handler of a link you can
   ```
   tracking.trackEvent({
      action: 'result_link_click',
      position: thePosition,
      title: result.title
   });
   ```
Then when a user clicks on a result link a tracking event is dispatched with:
```
{
  pageName: 'Results Page',
  searchTerm: 'chicken',
  numResults: 322,
  action: 'result_link_click',
  position: 3,
  title: 'A title'
}
```

We have created an AnalyticsProvider higher-order component that wraps our App "component". This provider wires up a custom dispatch function to the react-tracking library. This custom function is the `analyticsHandler` parameter passed into the initialize function.

A react-tracker dispatch function takes in a data payload that has no predefined structured.

## Routing
`src/routing.js` contains a hook, useAppPaths that return helper functions that are used to not only generate URLs for a route, but also can be used to define the routes in your App.js file.

### Using useAppPaths to generate a URL
`useAppPaths` will return an object with all the route names, as functions, defined in appPaths. The functions each take in an object that maps to the path patterns.

**Example**
```
// in routing.js
const appPaths = {
	HomePath: '/',
	ItemDetailsPath: '/:id',
};

// snippet from Home.jsx
import { useAppPaths } from './hooks';

...snip...

const {
	HomePath,
	ItemDetailsPath,
} = useAppPaths();

...snip...

<Link
		to={ItemDetailsPath({id: "6789"})}
		onClick={handleItemClick}>Item 6789</Link>
```

### Using useAppPaths to get a route
If you do not pass any parameters into the `useAppPaths` functions, then the original path pattern will be returned. This is used for defining routes.

**Example**
```
// in routing.js
const appPaths = {
	HomePath: '/',
	ItemDetailsPath: '/:id',
};

// Route definition from App.js
import { useAppPaths } from './hooks';

...snip...

const {
	HomePath,
	ItemDetailsPath,
} = useAppPaths();

...snip...

<Router>
	<Routes>
		<Route path={HomePath()} element={<Home />} />
		<Route path={ItemDetailsPath()} element={<ItemDetails />} />
		<Route path="/*" element={<PageNotFound />} />
	</Routes>
</Router>
```
