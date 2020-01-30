export const getBasePath = () => {
  const basePath = '/';
  const testHost = 'react-app-dev.cancer.gov';
  const { host, pathname } = window.location;
  return host === testHost ? pathname : basePath;
};