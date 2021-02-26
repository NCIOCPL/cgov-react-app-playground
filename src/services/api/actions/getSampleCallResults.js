export const getSampleCallResults = ({ id }) => {
	return {
		interceptorName: 'sampleApi',
		method: 'GET',
		endpoint: `{{API_ENDPOINT}}/sampleendpoint/${id}`,
	};
};
