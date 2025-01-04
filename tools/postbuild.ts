import * as path from "node:path";
import * as fs from "node:fs";
import {getPackages} from "./utils";
import {resolve} from "path";
import {setMetadata} from "./set-metadata";


function copyLicence() {
    const packages = getPackages();
    const licensePath = resolve(__dirname, '../LICENSE')

    for (const packageInfo of packages) {
        const destinationPath = path.join(packageInfo.buildPath, 'LICENSE');
        fs.copyFileSync(licensePath, destinationPath);
        console.log(`Copied LICENSE in ${destinationPath}.`);
    }
}

function main() {
    copyLicence();
    setMetadata();
}

main();
