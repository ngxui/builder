import {writeFile} from 'fs/promises';

import {getPackages} from './utils';

export async function setMetadata() {
    const ngxuiJson = require('../package.json');
    const keysToCopy = [
        'version',
        'repository',
        'author',
        'license',
        'homepage',
    ];

    const packages = getPackages();
    const versions: Record<string, string> = packages.reduce((p, q) => {
        p[q.packageName] = `${q.version}`;
        return p;
    }, {} as Record<string, string>);
    for (const pack of packages) {
        const packPath = `${pack.buildPath}/package.json`;
        const packPackage = require(packPath);

        // copy all meta data from the root package.json into all packages
        for (const key of keysToCopy) {
            packPackage[key] = ngxuiJson[key];
        }
        // set all the packages peerDependencies to be the same as root package.json version
        for (const packageInfo of packages) {
            if (packPackage.peerDependencies[packageInfo.packageName]) {
                packPackage.peerDependencies[packageInfo.packageName] = `^${versions[packageInfo.packageName]}`;
            }
        }
        packPackage.version = versions[packPackage.name];
        console.log(`package  ${packPackage.name} : version set to ${packPackage.version}`);

        // save the package file after we have updated the keys and peerDependencies
        try {
            await writeFile(packPath, JSON.stringify(packPackage, null, 2));
        } catch {
            console.error('Write failed!');
        }
    }
}
