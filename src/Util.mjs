import packageData from '../package.json' assert { type: 'json' };

export function getInstalledVersion() {
  return packageData.version;
}
