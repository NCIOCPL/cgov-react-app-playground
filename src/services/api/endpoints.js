let API_ENDPOINT;
let LANGUAGE;

function cleanURI(uri) {
	return uri.replace(/\/$/, '');
}

export function setAPIEndpoint(endpoint) {
	API_ENDPOINT = cleanURI(endpoint);
}

export function setLanguage(language) {
	LANGUAGE = language;
}

export const getEndpoint = (endpoint) => {
	// Define api endpoints here
	const urls = {
		sampleCall: `${API_ENDPOINT}/sampleendpoint`,
	};
	return urls[endpoint];
};
