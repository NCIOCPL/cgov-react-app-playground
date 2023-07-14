export const getSampleCallResults = ({ id }) => {
	return {
		interceptorName: 'sampleAPI',
		method: 'GET',
		endpoint: `{{API_ENDPOINT}}sampleendpoint/${id}`,
	};
};
