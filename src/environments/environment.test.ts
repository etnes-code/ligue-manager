import packageJson from '../../package.json';

export const environment = {
  appVersion: packageJson.version + '--test',
  production: false,
  base: 'area',
};
