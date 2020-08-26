Feature: No Results Found Analytics
	Scenario: Page Load Analytics fires when a user searches for a keyword
		Given "title" is set to "NCI Search Results"
		And "language" is set to "en"
		And "baseHost" is set to "http://localhost:3000"
		And "canonicalHost" is set to "https://www.cancer.gov"
		And "siteName" is set to "National Cancer Institute"
		And "channel" is set to "Search"
		And "analyticsContentGroup" is set to "Global Search"
		And "analyticsPublishedDate" is set to "02/02/2011"
		When the user navigates to "/"
		And the page title is "NCI Search Results"
		And browser waits
		Then there should be an analytics event with the following details
			| key                                  | value                                          |
			| type                                 | PageLoad                                       |
			| event                                | PlaygroundApp:Load:Home                 |
			| page.name                            | www.cancer.gov/                                |
			| page.title                           | NCI Search Results                             |
			| page.metaTitle                       | NCI Search Results - National Cancer Institute |
			| page.language                        | english                                        |
			| page.type                            | nciAppModulePage                               |
			| page.channel                         | Search                                         |
			| page.contentGroup                    | Global Search                                  |
			| page.publishedDate                   | 02/02/2011                                     |
			| page.additionalDetails.page | app_load                                          |
			
