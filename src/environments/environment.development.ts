import packageJson from '../../package.json';

export const environment = {
  appVersion: packageJson.version + '--dev',
  production: false,
  base: 'area',
};
