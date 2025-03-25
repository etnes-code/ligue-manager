import packageJson from '../../package.json';

export const environment = {
  appVersion: packageJson.version + '--stagging',
  production: false,
  base: 'area',
};
