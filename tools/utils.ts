import { exec, ExecOptions } from 'child_process';
import { resolve } from 'path';

export type PackageInfo = {
    path: string;
    version: string;
};


export const packageScope = "@ngxui";

export interface Package {
    name: string;
    packageName: string;
    buildPath: string;
    ngPackagrProjectPath: string;
    version: string;
}

export function getPackages(): Package[] {
    const json = require('../package.json');
    const packages: string[] = json.packages;

    return packages.map(pack => {
        const packInfo = parsePackageString(pack);
        if(!packInfo){
            throw Error(`Unable to parse package "${pack}"`);
        }
        const version = packInfo.version;
        const path = packInfo.path.split('/');
        const name = path[path.length - 1];
        const packageName = `${packageScope}/${name}`;

        const buildPath = resolve(__dirname, '../dist', packInfo.path);
        const ngPackagrProjectPath = resolve(
            __dirname,
            '../',
            'packages',
            name,
            'ng-package.json'
        );
        return {
            name,
            packageName,
            buildPath,
            ngPackagrProjectPath,
            version,
        };
    });
}

export function execute(script: string, options: ExecOptions = {}): Promise<string> {
    return new Promise<string>((resolvePromise, rejectPromise) => {
        exec(script, options, (error, stdout, stderr) => {
            if (error) {
                rejectPromise({ error, stderr });
            } else {
                resolvePromise(stdout);
            }
        });
    });
}

export function parsePackageString(packageString: string): PackageInfo | null {
    const match = packageString.match(/^(.*)::v([\d.]+(?:-[\w.]+)?)$/);
    if (!match) {
        return null;
    }
    const [, path, version] = match;
    return { path, version };
}

export function getTagFromVersion(version: string): string {
    // Use a regular expression to extract the tag after a hyphen
    const match = version.match(/-(\w[\w.-]*)$/);
    return match ? match[1] : "latest";
}

export function printGreenTxt(msg: string): void {
    console.log('\x1b[32m%s\x1b[0m', msg);
}
export function printYellowTxt(msg: string): void {
    console.log('\x1b[38;5;214m%s\x1b[0m', msg);
}
export function printBoldTxt(msg: string): void {
    console.log('\x1b[1m%s\x1b[0m', msg);
}
export function printRedTxt(msg: string): void {
    console.log('\x1b[31m%s\x1b[0m', msg);
}
